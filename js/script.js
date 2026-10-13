/* =====================================================
   script.js - logika pasar item
   Alur: pilih item -> masuk tas -> atur jumlah -> lihat rincian harga
   Data ada di js/data.js (variabel ITEMS)
   ===================================================== */

const KATEGORI = {
  all:      "Semua",
  attack:   "Attack",
  magic:    "Magic",
  defense:  "Defense",
  movement: "Boots",
  hybrid:   "Attack/Magic"
};
const WARNA = {
  attack:   ["#ff6b6b", "#b3263a"],
  magic:    ["#6ea8ff", "#2a4fb8"],
  defense:  ["#5fd38d", "#1f8a50"],
  movement: ["#ffd166", "#c98a10"],
  hybrid:   ["#c792ff", "#6d3bb8"]
};

// Rarity ditentukan dari harga gold (seperti tier item di game)
function rarity(price) {
  if (price >= 2400) return { key: "legend", label: "Legendary" };
  if (price >= 2000) return { key: "epic",   label: "Epic" };
  if (price >= 1000) return { key: "rare",   label: "Rare" };
  return { key: "common", label: "Common" };
}

// tas = objek { nomorItem: jumlah }, contoh { 0: 2, 5: 1 } = item ke-0 dibeli 2x
const state = { kategori: "all", urut: "default", tas: {}, dipilih: null, nama: "" };

// ---------- Helper ----------
const $ = (id) => document.getElementById(id);
const fmt = (n) => n.toLocaleString("id-ID");

// Cegah teks dari data merusak HTML
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Ikon SVG (data URI) per item: warna sesuai kategori + inisial nama.
function ikon(item) {
  const [a, b] = WARNA[item.category];
  const kata = item.name.replace(/'s/g, "").split(" ");
  const inisial = (kata[0][0] + (kata[1] ? kata[1][0] : kata[0][1] || "")).toUpperCase();
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>` +
    `<polygon points="100,8 184,56 184,144 100,192 16,144 16,56" fill="url(#g)" stroke="#f5b942" stroke-width="6"/>` +
    `<text x="100" y="118" text-anchor="middle" font-family="Arial,sans-serif" font-size="68" font-weight="700" fill="#0b0f1a">${inisial}</text>` +
    `</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// ---------- Perhitungan tas ----------
const entriTas = () => Object.entries(state.tas).map(([idx, qty]) => ({ idx: Number(idx), qty, item: ITEMS[Number(idx)] }));
const jumlahItem = () => entriTas().reduce((t, e) => t + e.qty, 0);
const totalGold  = () => entriTas().reduce((t, e) => t + e.qty * e.item.price, 0);

// ---------- Render daftar item ----------
function dataTersaring() {
  let hasil = ITEMS.filter((it) => state.kategori === "all" || it.category === state.kategori);
  if (state.urut === "termurah") hasil = [...hasil].sort((x, y) => x.price - y.price);
  if (state.urut === "termahal") hasil = [...hasil].sort((x, y) => y.price - x.price);
  if (state.urut === "nama")     hasil = [...hasil].sort((x, y) => x.name.localeCompare(y.name));
  return hasil;
}

function render() {
  const hasil = dataTersaring();
  $("grid").innerHTML = hasil.map((it) => {
    const idx = ITEMS.indexOf(it);
    const r = rarity(it.price);
    const qty = state.tas[idx] || 0;
    return `
      <div class="col">
        <article class="product-card rarity-${r.key}">
          <div class="product-img">
            <img src="${ikon(it)}" alt="Ikon item ${esc(it.name)}" width="160" height="160" loading="lazy">
          </div>
          <div class="product-body">
            <div class="badges">
              <span class="badge-cat cat-${it.category}">${KATEGORI[it.category]}</span>
              <span class="rarity-tag tag-${r.key}">${r.label}</span>
            </div>
            <h3 class="product-name">${esc(it.name)}</h3>
            <ul class="product-stats">${it.stats.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
            <div class="product-footer">
              <div class="price"><span class="coin" aria-hidden="true"></span>${fmt(it.price)} <small>Gold</small></div>
              <div class="card-actions">
                <button class="btn btn-outline-light btn-sm" data-aksi="detail" data-idx="${idx}">Detail</button>
                <button class="btn ${qty ? "btn-in-bag" : "btn-gold"} btn-sm" data-aksi="beli" data-idx="${idx}">${qty ? "&#10003; Di tas (" + qty + ")" : "+ Tas"}</button>
              </div>
            </div>
          </div>
        </article>
      </div>`;
  }).join("");

  $("hasilInfo").textContent = `Menampilkan ${hasil.length} dari ${ITEMS.length} item`;
}

function renderFilter() {
  $("filterKategori").innerHTML = Object.entries(KATEGORI).map(([k, label]) =>
    `<button type="button" class="filter-btn" data-kat="${k}" aria-pressed="${k === state.kategori}">${label}</button>`
  ).join("");
}

// ---------- Modal detail item ----------
function bukaDetail(idx) {
  const it = ITEMS[idx];
  state.dipilih = idx;
  $("modalJudul").textContent = it.name;
  $("modalBody").innerHTML = `
    <img class="detail-img img-fluid" src="${ikon(it)}" alt="Ikon item ${esc(it.name)}">
    <div class="badges">
      <span class="badge-cat cat-${it.category}">${KATEGORI[it.category]}</span>
      <span class="rarity-tag tag-${rarity(it.price).key}">${rarity(it.price).label}</span>
    </div>
    <h3 class="h6 mt-3">Stat</h3>
    <ul class="detail-list">${it.stats.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
    <h3 class="h6">Passive / Active</h3>
    <p>${it.passive ? esc(it.passive) : "Tidak ada"}</p>
    <p class="price mb-0"><span class="coin" aria-hidden="true"></span>${fmt(it.price)} <small>Gold</small></p>`;
  bootstrap.Modal.getOrCreateInstance($("modalItem")).show();
}

// ---------- Tas belanja ----------
function tambah(idx) {
  state.tas[idx] = (state.tas[idx] || 0) + 1;
  perbarui();
}
function ubahJumlah(idx, delta) {
  const baru = (state.tas[idx] || 0) + delta;
  if (baru <= 0) delete state.tas[idx];
  else state.tas[idx] = baru;
  perbarui();
}
function hapus(idx) {
  delete state.tas[idx];
  perbarui();
}
function kosongkan() {
  state.tas = {};
  perbarui();
}

// Dipanggil setiap isi tas berubah: segarkan tombol di kartu + isi panel tas
function perbarui() {
  render();
  renderTas();
}

function renderTas() {
  const daftar = entriTas();
  $("cartCount").textContent = jumlahItem();
  $("daftarKeranjang").innerHTML = daftar.length
    ? daftar.map(({ idx, qty, item }) => `
        <li class="cart-item">
          <div class="cart-info">
            <strong>${esc(item.name)}</strong>
            <small class="text-muted-2">${fmt(item.price)} Gold &times; ${qty} = <span class="text-gold">${fmt(item.price * qty)}</span></small>
          </div>
          <div class="qty" role="group" aria-label="Jumlah ${esc(item.name)}">
            <button type="button" data-ubah="-1" data-idx="${idx}" aria-label="Kurangi">&minus;</button>
            <span aria-live="polite">${qty}</span>
            <button type="button" data-ubah="1" data-idx="${idx}" aria-label="Tambah">+</button>
          </div>
          <button type="button" class="cart-remove" data-hapus="${idx}" aria-label="Hapus ${esc(item.name)}">Hapus</button>
        </li>`).join("")
    : `<li class="text-muted-2">Tas masih kosong. Pilih item lalu tekan tombol &quot;+ Tas&quot;.</li>`;
  $("totalGold").textContent = fmt(totalGold());
  $("btnRincian").disabled = daftar.length === 0;
  $("kosongkan").disabled = daftar.length === 0;
}

// ---------- Rincian harga (struk) ----------
function bukaRincian() {
  const daftar = entriTas().sort((a, b) => a.idx - b.idx);
  if (!daftar.length) return;

  // Rangkuman per kategori
  const perKat = {};
  daftar.forEach(({ qty, item }) => {
    perKat[item.category] = perKat[item.category] || { qty: 0, gold: 0 };
    perKat[item.category].qty  += qty;
    perKat[item.category].gold += qty * item.price;
  });

  const total = totalGold();
  const jumlah = jumlahItem();
  const termahal = daftar.reduce((m, e) => (e.item.price > m.item.price ? e : m));
  const tgl = new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });

  $("rincianBody").innerHTML = `
    <h3 class="h5 mb-1">${state.nama ? esc(state.nama) : "Build tanpa nama"}</h3>
    <p class="text-muted-2 small mb-3">Dibuat pada ${esc(tgl)}</p>

    <div class="table-responsive">
      <table class="table table-dark table-sm align-middle receipt">
        <thead>
          <tr><th>#</th><th>Item</th><th class="text-end">Harga</th><th class="text-center">Jml</th><th class="text-end">Subtotal</th></tr>
        </thead>
        <tbody>
          ${daftar.map(({ qty, item }, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${esc(item.name)}<br><span class="badge-cat cat-${item.category}">${KATEGORI[item.category]}</span></td>
              <td class="text-end">${fmt(item.price)}</td>
              <td class="text-center">${qty}</td>
              <td class="text-end">${fmt(item.price * qty)}</td>
            </tr>`).join("")}
        </tbody>
        <tfoot>
          <tr class="receipt-total">
            <td colspan="4" class="text-end">TOTAL HARGA</td>
            <td class="text-end"><span class="coin" aria-hidden="true"></span>${fmt(total)} Gold</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <h3 class="h6 mt-4">Rangkuman</h3>
    <ul class="summary-list">
      <li><span>Jenis item</span><strong>${daftar.length}</strong></li>
      <li><span>Total jumlah item</span><strong>${jumlah}</strong></li>
      <li><span>Rata-rata harga per item</span><strong>${fmt(Math.round(total / jumlah))} Gold</strong></li>
      <li><span>Item termahal</span><strong>${esc(termahal.item.name)} (${fmt(termahal.item.price)})</strong></li>
    </ul>

    <h3 class="h6 mt-4">Per kategori</h3>
    <ul class="summary-list">
      ${Object.entries(perKat).map(([k, v]) =>
        `<li><span>${KATEGORI[k]} (${v.qty} item)</span><strong>${fmt(v.gold)} Gold</strong></li>`).join("")}
    </ul>`;

  const off = bootstrap.Offcanvas.getInstance($("panelKeranjang"));
  if (off) off.hide();
  bootstrap.Modal.getOrCreateInstance($("modalRincian")).show();
}

// ---------- Event listener ----------
$("urut").addEventListener("change", (e) => { state.urut = e.target.value; render(); });

$("filterKategori").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-kat]");
  if (!btn) return;
  state.kategori = btn.dataset.kat;
  renderFilter();
  render();
});

$("grid").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-aksi]");
  if (!btn) return;
  const idx = Number(btn.dataset.idx);
  if (btn.dataset.aksi === "detail") bukaDetail(idx);
  else tambah(idx);
});

$("modalTambah").addEventListener("click", () => {
  if (state.dipilih !== null) tambah(state.dipilih);
  bootstrap.Modal.getInstance($("modalItem")).hide();
});

$("daftarKeranjang").addEventListener("click", (e) => {
  const u = e.target.closest("[data-ubah]");
  if (u) return ubahJumlah(Number(u.dataset.idx), Number(u.dataset.ubah));
  const h = e.target.closest("[data-hapus]");
  if (h) hapus(Number(h.dataset.hapus));
});

$("namaBuild").addEventListener("input", (e) => { state.nama = e.target.value.trim(); });
$("btnRincian").addEventListener("click", bukaRincian);
$("kosongkan").addEventListener("click", kosongkan);
$("rincianReset").addEventListener("click", () => {
  kosongkan();
  bootstrap.Modal.getInstance($("modalRincian")).hide();
});

// ---------- Ticker harga (item termahal) ----------
function renderTicker() {
  const top = [...ITEMS].sort((a, b) => b.price - a.price).slice(0, 10);
  const html = top.map((it) =>
    `<span class="ticker-item">${esc(it.name)} <b>${fmt(it.price)}</b><span class="coin" aria-hidden="true"></span></span>`).join("");
  $("tickerTrack").innerHTML = html + html; // digandakan agar animasi berputar mulus
}

// ---------- Mulai ----------
renderTicker();
$("totalItem").textContent = ITEMS.length;
renderFilter();
render();
renderTas();