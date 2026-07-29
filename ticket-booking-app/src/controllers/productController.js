const ARTIST_IMAGES = {
  NCT: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80",
  NCT_DREAMS:
    "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1400&q=80",
  EXO: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80",
  ATLAS:
    "https://images.unsplash.com/photo-1464375117522-1311dd6a6cd7?auto=format&fit=crop&w=1400&q=80",
  LYKN: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1400&q=80",
  JASPER:
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80",
  NCT_X_EXO:
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=80"
};

const products = [
  {
    id: "TKT-001",
    name: "NCT Neo City Jakarta",
    artist: "NCT",
    category: "KPOP",
    date: "2026-08-15",
    price: 1350000,
    stock: 180,
    venue: "Indonesia Arena",
    area: "Senayan, Jakarta",
    artistImage: ARTIST_IMAGES.NCT
  },
  {
    id: "TKT-002",
    name: "NCT DREAMS The Future Surabaya",
    artist: "NCT DREAMS",
    category: "KPOP",
    date: "2026-08-22",
    price: 1200000,
    stock: 220,
    venue: "Jatim Expo Hall",
    area: "Wonocolo, Surabaya",
    artistImage: ARTIST_IMAGES.NCT_DREAMS
  },
  {
    id: "TKT-003",
    name: "EXO Elysium Reunion Bandung",
    artist: "EXO",
    category: "KPOP",
    date: "2026-09-05",
    price: 1280000,
    stock: 160,
    venue: "GBLA Indoor Dome",
    area: "Gedebage, Bandung",
    artistImage: ARTIST_IMAGES.EXO
  },
  {
    id: "TKT-004",
    name: "ATLAS Live in Yogyakarta",
    artist: "ATLAS",
    category: "TPOP",
    date: "2026-09-12",
    price: 640000,
    stock: 240,
    venue: "Jogja Expo Center",
    area: "Banguntapan, Bantul",
    artistImage: ARTIST_IMAGES.ATLAS
  },
  {
    id: "TKT-005",
    name: "LYKN First Impact Medan",
    artist: "LYKN",
    category: "TPOP",
    date: "2026-09-26",
    price: 690000,
    stock: 140,
    venue: "Santika Convention Hall",
    area: "Medan Petisah, Medan",
    artistImage: ARTIST_IMAGES.LYKN
  },
  {
    id: "TKT-006",
    name: "JASPER Citylight Show Makassar",
    artist: "JASPER",
    category: "TPOP",
    date: "2026-10-03",
    price: 560000,
    stock: 260,
    venue: "Celebes Convention Center",
    area: "Panakkukang, Makassar",
    artistImage: ARTIST_IMAGES.JASPER
  },
  {
    id: "TKT-007",
    name: "NCT DREAMS Encore Jakarta",
    artist: "NCT DREAMS",
    category: "KPOP",
    date: "2026-10-10",
    price: 1180000,
    stock: 170,
    venue: "ICE BSD Hall 5",
    area: "Pagedangan, Tangerang",
    artistImage: ARTIST_IMAGES.NCT_DREAMS
  },
  {
    id: "TKT-008",
    name: "EXO Luminance Night Surabaya",
    artist: "EXO",
    category: "KPOP",
    date: "2026-10-17",
    price: 1320000,
    stock: 190,
    venue: "Grand City Convex",
    area: "Genteng, Surabaya",
    artistImage: ARTIST_IMAGES.EXO
  },
  {
    id: "TKT-009",
    name: "ATLAS Summer Wave Bali",
    artist: "ATLAS",
    category: "TPOP",
    date: "2026-10-31",
    price: 620000,
    stock: 210,
    venue: "Bali Nusa Dua Convention Center",
    area: "Nusa Dua, Badung",
    artistImage: ARTIST_IMAGES.ATLAS
  },
  {
    id: "TKT-010",
    name: "LYKN Fan Concert Bandung",
    artist: "LYKN",
    category: "TPOP",
    date: "2026-11-07",
    price: 650000,
    stock: 230,
    venue: "Sasana Budaya Ganesha",
    area: "Coblong, Bandung",
    artistImage: ARTIST_IMAGES.LYKN
  },
  {
    id: "TKT-011",
    name: "JASPER Midnight Pop Jakarta",
    artist: "JASPER",
    category: "TPOP",
    date: "2026-11-14",
    price: 580000,
    stock: 155,
    venue: "Basket Hall Senayan",
    area: "Gelora, Jakarta",
    artistImage: ARTIST_IMAGES.JASPER
  },
  {
    id: "TKT-012",
    name: "NCT x EXO KPOP Legends Fest",
    artist: "NCT x EXO",
    category: "KPOP",
    date: "2026-11-21",
    price: 1580000,
    stock: 280,
    venue: "Jakarta International Stadium",
    area: "Tanjung Priok, Jakarta",
    artistImage: ARTIST_IMAGES.NCT_X_EXO
  },
  {
    id: "TKT-013",
    name: "NCT Neo City Bandung",
    artist: "NCT",
    category: "KPOP",
    date: "2026-11-28",
    price: 1240000,
    stock: 130,
    venue: "Trans Convention Centre",
    area: "Buahbatu, Bandung",
    artistImage: ARTIST_IMAGES.NCT
  },
  {
    id: "TKT-014",
    name: "ATLAS Pop Nation Semarang",
    artist: "ATLAS",
    category: "TPOP",
    date: "2026-12-05",
    price: 590000,
    stock: 250,
    venue: "Marina Convention Center",
    area: "Semarang Barat, Semarang",
    artistImage: ARTIST_IMAGES.ATLAS
  },
  {
    id: "TKT-015",
    name: "EXO Premium Stage Jakarta",
    artist: "EXO",
    category: "KPOP",
    date: "2026-12-12",
    price: 1420000,
    stock: 200,
    venue: "Istora Senayan",
    area: "Senayan, Jakarta",
    artistImage: ARTIST_IMAGES.EXO
  },
  {
    id: "TKT-016",
    name: "LYKN Spotlight Night Yogyakarta",
    artist: "LYKN",
    category: "TPOP",
    date: "2026-12-19",
    price: 640000,
    stock: 240,
    venue: "Sleman City Hall Ballroom",
    area: "Mlati, Sleman",
    artistImage: ARTIST_IMAGES.LYKN
  },
  {
    id: "TKT-017",
    name: "NCT DREAMS Final Wave Bali",
    artist: "NCT DREAMS",
    category: "KPOP",
    date: "2026-12-26",
    price: 1290000,
    stock: 175,
    venue: "Bali International Convention Centre",
    area: "Nusa Dua, Badung",
    artistImage: ARTIST_IMAGES.NCT_DREAMS
  },
  {
    id: "TKT-018",
    name: "JASPER x ATLAS Year End Show",
    artist: "JASPER x ATLAS",
    category: "TPOP",
    date: "2026-12-27",
    price: 730000,
    stock: 260,
    venue: "Sentul International Convention Center",
    area: "Babakan Madang, Bogor",
    artistImage: ARTIST_IMAGES.JASPER
  }
];

function listProducts(req, res) {
  return res.json({
    data: products
  });
}

function getProducts() {
  return products;
}

function findProductById(id) {
  return products.find((product) => product.id === id) || null;
}

module.exports = {
  listProducts,
  getProducts,
  findProductById
};
