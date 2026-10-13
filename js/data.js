/*
  DATA ITEM MLBB (Patch 2.2.16)
  Sumber: https://mlbbhub.com/items  (diakses 12 Oktober 2026)
  Harga dalam GOLD (harga di dalam game). Passive/Active hanya ditulis namanya.
  Kolom: name, category, price, stats, passive
  Kategori: attack | magic | defense | movement | hybrid
*/
const ITEMS = [
  // ===== ATTACK =====
  { name: "Blade of Despair",        category: "attack",   price: 3010, stats: ["Phys ATK +160", "Move Speed +5%"],                       passive: "Despair" },
  { name: "Berserker's Fury",        category: "attack",   price: 2390, stats: ["Phys ATK +60", "Crit Chance +25%"],                      passive: "Doom" },
  { name: "Endless Battle",          category: "attack",   price: 2330, stats: ["HP +250", "Phys ATK +60", "CDR +10%"],                   passive: "Divine Justice" },
  { name: "Demon Hunter Sword",      category: "attack",   price: 2180, stats: ["Phys ATK +35", "Attack Speed +20%"],                     passive: "Devour" },
  { name: "Great Dragon Spear",      category: "attack",   price: 2140, stats: ["Phys ATK +70", "Crit Chance +20%", "CDR +10%"],          passive: "Supreme Warrior" },
  { name: "Malefic Gun",             category: "attack",   price: 2120, stats: ["Phys ATK +40", "Attack Speed +20%"],                     passive: "Armor Buster" },
  { name: "War Axe",                 category: "attack",   price: 2100, stats: ["HP +400", "Phys ATK +35", "CDR +10%"],                   passive: "Fighting Spirit" },
  { name: "Malefic Roar",            category: "attack",   price: 2060, stats: ["Phys ATK +60"],                                          passive: "Armor Buster" },
  { name: "Sea Halberd",             category: "attack",   price: 2050, stats: ["Phys ATK +80", "Attack Speed +20%"],                     passive: "Lifebane" },
  { name: "Corrosion Scythe",        category: "attack",   price: 2050, stats: ["Phys ATK +30", "Attack Speed +30%", "Move Speed +5%"],   passive: "Corrosion" },
  { name: "Haas's Claws",            category: "attack",   price: 2020, stats: ["Phys ATK +40", "Attack Speed +15%", "Crit Chance +20%"], passive: "Frenzy" },
  { name: "Hunter Strike",           category: "attack",   price: 2010, stats: ["Phys ATK +80", "CDR +10%"],                              passive: "Retribution" },
  { name: "Golden Staff",            category: "attack",   price: 2000, stats: ["Phys ATK +55", "Attack Speed +15%"],                     passive: "Swift" },
  { name: "Blade of the Heptaseas",  category: "attack",   price: 1950, stats: ["HP +250", "Phys ATK +70"],                               passive: "Ambush" },
  { name: "Wind of Nature",          category: "attack",   price: 1910, stats: ["Phys ATK +30", "Attack Speed +20%", "Lifesteal +10%"],   passive: "Wind Chant (Active)" },
  { name: "Windtalker",              category: "attack",   price: 1880, stats: ["Attack Speed +35%", "Crit Chance +20%", "Move Speed +20"], passive: "Typhoon" },
  { name: "Rose Gold Meteor",        category: "attack",   price: 1820, stats: ["Phys ATK +30", "Attack Speed +20%", "Lifesteal +10%"],   passive: "Dragon Scale" },
  { name: "Magic Blade",             category: "attack",   price: 1050, stats: ["Phys ATK +35", "Lifesteal +10%"],                        passive: "Lifeline" },
  { name: "Swift Crossbow",          category: "attack",   price: 1000, stats: ["Attack Speed +20%"],                                     passive: "Crossbow" },
  { name: "Legion Sword",            category: "attack",   price: 910,  stats: ["Phys ATK +60"],                                          passive: null },
  { name: "Rogue Meteor",            category: "attack",   price: 900,  stats: ["Attack Speed +15%", "Crit Chance +10%"],                 passive: null },
  { name: "Fury Hammer",             category: "attack",   price: 830,  stats: ["Phys ATK +35"],                                          passive: null },
  { name: "Dagger",                  category: "attack",   price: 250,  stats: ["Phys ATK +15"],                                          passive: null },

  // ===== MAGIC =====
  { name: "Holy Crystal",            category: "magic",    price: 3000, stats: ["Magic Power +165"],                                      passive: "Mystery" },
  { name: "Lightning Truncheon",     category: "magic",    price: 2250, stats: ["Mana +400", "Magic Power +75", "CDR +10%"],              passive: "Resonate" },
  { name: "Wishing Lantern",         category: "magic",    price: 2250, stats: ["Mana +400", "Magic Power +75", "CDR +10%"],              passive: "Butterfly Goddess" },
  { name: "Starlium Scythe",         category: "magic",    price: 2220, stats: ["Magic Power +75", "CDR +10%", "Mana Regen +6"],          passive: "Crisis" },
  { name: "Blood Wings",             category: "magic",    price: 2100, stats: ["Magic Power +90"],                                       passive: "Guard" },
  { name: "Enchanted Talisman",      category: "magic",    price: 2070, stats: ["HP +300", "Magic Power +75", "CDR +15%"],                passive: "Mana Spring" },
  { name: "Glowing Wand",            category: "magic",    price: 2050, stats: ["HP +300", "Magic Power +60", "Move Speed +5%"],          passive: "Scorch" },
  { name: "Ice Queen Wand",          category: "magic",    price: 2040, stats: ["HP +300", "Magic Power +60", "Spell Vamp +10%"],         passive: "Ice Bound" },
  { name: "Clock of Destiny",        category: "magic",    price: 2030, stats: ["HP +400", "Mana +400", "Magic Power +45"],               passive: "Destiny" },
  { name: "Feather of Heaven",       category: "magic",    price: 2030, stats: ["Magic Power +60", "Attack Speed +20%", "CDR +5%"],       passive: "Affliction" },
  { name: "Concentrated Energy",     category: "magic",    price: 2020, stats: ["HP +400", "Magic Power +75"],                            passive: "Recharge" },
  { name: "Genius Wand",             category: "magic",    price: 2000, stats: ["Magic Power +75", "Move Speed +5%"],                     passive: "Magic" },
  { name: "Divine Glaive",           category: "magic",    price: 1970, stats: ["Magic Power +60"],                                       passive: "Spellbreaker" },
  { name: "Flask of the Oasis",      category: "magic",    price: 1850, stats: ["HP +300", "Magic Power +60", "CDR +10%"],                passive: "Blessing" },
  { name: "Magic Wand",              category: "magic",    price: 820,  stats: ["Magic Power +45"],                                       passive: null },
  { name: "Mystery Codex",           category: "magic",    price: 300,  stats: ["Magic Power +15"],                                       passive: null },

  // ===== DEFENSE =====
  { name: "Guardian Helmet",         category: "defense",  price: 2500, stats: ["HP +1800", "HP Regen +20"],                              passive: "Recovery" },
  { name: "Queen's Wings",           category: "defense",  price: 2250, stats: ["HP +600", "CDR +10%", "Spell Vamp +10%"],                passive: "Demonize" },
  { name: "Antique Cuirass",         category: "defense",  price: 2170, stats: ["HP +920", "Phys DEF +40", "HP Regen +4"],                passive: "Deter" },
  { name: "Athena's Shield",         category: "defense",  price: 2150, stats: ["HP +900", "Magic DEF +48", "HP Regen +2"],               passive: "Shield" },
  { name: "Immortality",             category: "defense",  price: 2120, stats: ["HP +800", "Phys DEF +15"],                               passive: "Immortal" },
  { name: "Chastise Pauldron",       category: "defense",  price: 2100, stats: ["HP +900", "Phys DEF +40"],                               passive: "Chastise" },
  { name: "Dominance Ice",           category: "defense",  price: 2010, stats: ["Phys DEF +40", "Magic DEF +40", "Move Speed +5%"],       passive: "Fortress Shield" },
  { name: "Blade Armor",             category: "defense",  price: 1910, stats: ["Phys DEF +70"],                                          passive: "Bladed Armor" },
  { name: "Cursed Helmet",           category: "defense",  price: 1910, stats: ["HP +1200", "Magic DEF +20"],                             passive: "Burning Soul" },
  { name: "Radiant Armor",           category: "defense",  price: 1880, stats: ["HP +950", "Magic DEF +40", "HP Regen +12"],              passive: "Holy Blessing" },
  { name: "Brute Force Breastplate", category: "defense",  price: 1870, stats: ["HP +600", "Phys DEF +20", "CDR +10%"],                   passive: "Brute Force" },
  { name: "Oracle",                  category: "defense",  price: 1860, stats: ["HP +850", "Phys DEF +20", "Magic DEF +20"],              passive: "Bless" },
  { name: "Thunder Belt",            category: "defense",  price: 1820, stats: ["HP +800", "Phys DEF +15", "Magic DEF +15"],              passive: "Thunderbolt" },
  { name: "Black Ice Shield",        category: "defense",  price: 780,  stats: ["Phys DEF +20", "Magic DEF +20"],                         passive: "Fortress Shield" },

  // ===== MOVEMENT (BOOTS) =====
  { name: "Rapid Boots",             category: "movement", price: 750,  stats: ["Move Speed +55"],                                        passive: "Movement Speed" },
  { name: "Warrior Boots",           category: "movement", price: 720,  stats: ["Phys DEF +18", "Move Speed +40"],                        passive: "Valor" },
  { name: "Demon Boots",             category: "movement", price: 720,  stats: ["Move Speed +40", "Mana Regen +10"],                      passive: "Mysticism" },
  { name: "Magic Boots",             category: "movement", price: 710,  stats: ["CDR +10%", "Move Speed +40"],                            passive: null },
  { name: "Swift Boots",             category: "movement", price: 710,  stats: ["Attack Speed +15%", "Move Speed +40"],                   passive: null },
  { name: "Tough Boots",             category: "movement", price: 700,  stats: ["Magic DEF +18", "Move Speed +40"],                       passive: "Fortitude" },
  { name: "Arcane Boots",            category: "movement", price: 690,  stats: ["Magic Penetration +10", "Move Speed +40"],               passive: null },
  { name: "Boots",                   category: "movement", price: 250,  stats: ["Move Speed +20"],                                        passive: null },

  // ===== HYBRID (ATTACK / MAGIC) =====
  { name: "Fleeting Time",           category: "hybrid",   price: 2050, stats: ["HP +600", "CDR +15%"],                                   passive: "Timestream" },
  { name: "Winter Crown",            category: "hybrid",   price: 1910, stats: ["HP +400", "CDR +5%"],                                    passive: "Frozen (Active)" }
];