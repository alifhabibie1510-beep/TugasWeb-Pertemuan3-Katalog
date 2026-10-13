# TugasWeb-Pertemuan3-Katalog

Tugas Rutin 3, Pemrograman Web, Universitas Negeri Medan (UNIMED)

| | |
|---|---|
| Nama | Muhammad Alif Habibie |
| NIM | 4253250061 |
| Program Studi | Ilmu Komputer |

## Deskripsi

Katalog produk responsif bertema **[CEK: tema produk, misalnya item Mobile Legends]**,
dibangun dengan **[CEK: Bootstrap 5 / Tailwind CSS]** memakai pendekatan **mobile-first**.
Tampilan menyesuaikan ukuran layar dari HP sampai desktop.

## Fitur

- Navbar responsif dengan menu hamburger di layar kecil
- Grid produk yang berubah jumlah kolom sesuai lebar layar
- Card produk: gambar, nama, harga, dan tombol aksi
- Gambar responsif yang tidak melebihi lebar kontainer
- Tipografi fluid memakai `clamp()`
- Footer

## Checklist requirement

| # | Requirement | Implementasi |
|---|-------------|--------------|
| 1 | Mobile-first | Gaya dasar untuk layar kecil, lalu diperluas dengan breakpoint ke atas |
| 2 | Minimal 3 breakpoint | [CEK: contoh Bootstrap `sm 576px`, `md 768px`, `lg 992px`] |
| 3 | Grid responsif 1 → 2 → 3/4 kolom | [CEK: contoh `row-cols-1 row-cols-md-2 row-cols-lg-4`] |
| 4 | Card produk (gambar + info + harga + tombol) | [CEK: nama kelas/komponen] |
| 5 | Navbar responsif (hamburger di mobile) | [CEK: contoh `navbar-toggler`] |
| 6 | Responsive images | [CEK: contoh `img-fluid`, atribut `width`/`height`, `loading="lazy"`] |
| 7 | `clamp()` untuk tipografi | [CEK: salin satu contoh, misalnya `font-size: clamp(1.5rem, 4vw, 2.5rem)`] |
| 8 | Footer | Ada di bagian bawah halaman |
| 9 | Dokumentasi testing 3 breakpoint | Lihat bagian di bawah |

## Teknologi

- HTML5 semantik
- [CEK: Bootstrap 5.3 / Tailwind CSS] (via CDN, **butuh koneksi internet**)
- CSS kustom (`style.css`)
- JavaScript [CEK: dipakai atau tidak]

## Cara menjalankan

Proyek ini statis, tidak butuh instalasi.

1. Buka folder proyek di VS Code dan pasang ekstensi **Live Server** (Ritwick Dey).
2. Klik kanan `index.html`, lalu pilih **Open with Live Server**.
3. Buka `http://127.0.0.1:5500` (port 5500).

Alternatif: klik dua kali `index.html` agar terbuka di browser.

## Dokumentasi testing responsif

Pengujian dilakukan lewat Chrome/Edge DevTools: tekan **F12**, klik ikon
**Toggle device toolbar**, lalu atur lebar layar.

| Perangkat | Lebar | Jumlah kolom | Hasil |
|-----------|-------|--------------|-------|
| Mobile | 375 px | 1 | Navbar menjadi hamburger, tidak ada scroll horizontal |
| Tablet | 768 px | 2 | [CEK: catat perubahan yang terlihat] |
| Desktop | 1280 px | [CEK: 3 atau 4] | Navbar tampil penuh |

**Mobile (375 px)**

![Mobile](docs/mobile-375.png)

**Tablet (768 px)**

![Tablet](docs/tablet-768.png)

**Desktop (1280 px)**

![Desktop](docs/desktop-1280.png)

Yang diperiksa di tiap ukuran: menu hamburger berfungsi, gambar tidak keluar dari kartu,
teks terbaca, dan tidak ada scroll horizontal.

## Aksesibilitas

- Semua gambar punya teks `alt` yang deskriptif
- Tombol hamburger punya label untuk pembaca layar [CEK: `aria-label`]
- Struktur heading berurutan dan memakai elemen semantik

## Struktur folder

```
TR3_Katalog/
├── docs/            Screenshot testing
├── [CEK: img/]      Gambar produk
├── index.html
├── style.css
└── README.md
```