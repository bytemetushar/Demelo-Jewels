import diamondEarrings from "../assets/diamond_earrings_luxury_jewelry.jpg";
import diamondNecklace from "../assets/elegant_diamond_necklace_dark_background.jpg";
import goldCollection from "../assets/gold_jewelry_collection_luxury.jpg";
import goldBracelet from "../assets/luxury_gold_bracelet_jewelry.jpg";
import goldRings from "../assets/luxury_jewelry_gold_rings_diamonds.jpg";
import luxuryWatch from "../assets/luxury_watch_gold_jewelry.jpg";

export const products = [
  {
    id: 1,
    name: "Diamond Stud Earrings",
    category: "Earrings",
    price: 4200,
    image: diamondEarrings,
    badge: "Bestseller",
    rating: 4.9,
    reviews: 24,
    material: "18K White Gold & VVS1 Diamonds",
    description: "Timeless diamond stud earrings featuring two perfectly matched VVS1 diamonds set in 18K white gold. Each stone is hand-selected for exceptional brilliance and fire, creating a luminous frame for the face.",
    specs: { carat: "2.4ct total", clarity: "VVS1", cut: "Excellent", setting: "4-prong" },
    featured: true,
  },
  {
    id: 2,
    name: "Celestine Diamond Necklace",
    category: "Necklaces",
    price: 18500,
    image: diamondNecklace,
    badge: "Signature",
    rating: 5.0,
    reviews: 12,
    material: "18K Gold & Natural Diamonds",
    description: "Hand-set with 47 conflict-free diamonds on an 18K gold chain, the Celestine is the centerpiece of our Atelier collection. Each stone is selected for brilliance and clarity, then set by master artisans in our Milan workshop.",
    specs: { diamonds: "47 stones", gold: "18K", craftTime: "120 hours", chain: "45cm" },
    featured: true,
  },
  {
    id: 3,
    name: "Heritage Gold Set",
    category: "Collections",
    price: 8900,
    image: goldCollection,
    badge: "Collection",
    rating: 4.8,
    reviews: 18,
    material: "22K Yellow Gold",
    description: "A breathtaking three-piece set that pays homage to traditional goldsmithing techniques passed down through generations. The Heritage set includes a necklace, earrings, and bangle, each featuring intricate hand-engraved patterns.",
    specs: { pieces: "3-piece set", gold: "22K", weight: "86g total", finish: "Hand-engraved" },
    featured: true,
  },
  {
    id: 4,
    name: "Gold Link Bracelet",
    category: "Bracelets",
    price: 5600,
    image: goldBracelet,
    badge: "Limited",
    rating: 4.7,
    reviews: 31,
    material: "18K Rose Gold",
    description: "Bold yet refined, this gold link bracelet features interlocking oval links crafted from solid 18K rose gold. The warm pink hue flatters every skin tone, while the substantial weight speaks to its quality.",
    specs: { length: "19cm", width: "12mm", gold: "18K Rose", clasp: "Hidden safety" },
    featured: true,
  },
  {
    id: 5,
    name: "Gold Eternity Ring",
    category: "Rings",
    price: 3800,
    image: goldRings,
    badge: "New",
    rating: 4.9,
    reviews: 42,
    material: "18K Yellow Gold & Diamonds",
    description: "A continuous circle of brilliance, the Eternity Ring features 24 pavé-set diamonds encircling a band of solid 18K yellow gold. Symbolizing everlasting love, it is perfect as a wedding band or a statement piece.",
    specs: { diamonds: "24 stones", gold: "18K Yellow", band: "2.5mm", sizes: "5-9" },
    featured: true,
  },
  {
    id: 6,
    name: "Chronograph Luxe",
    category: "Watches",
    price: 12400,
    image: luxuryWatch,
    badge: "Exclusive",
    rating: 4.8,
    reviews: 9,
    material: "18K Gold & Sapphire Crystal",
    description: "Precision meets luxury in this hand-assembled chronograph. The 18K gold case houses a Swiss movement visible through a sapphire crystal caseback. The mother-of-pearl dial catches light with every movement of the wrist.",
    specs: { movement: "Swiss automatic", case: "40mm 18K Gold", waterResist: "50m", crystal: "Sapphire" },
    featured: true,
  },
  {
    id: 7,
    name: "Sapphire Pendant Necklace",
    category: "Pendants",
    price: 7200,
    image: diamondNecklace,
    badge: "New",
    rating: 4.9,
    reviews: 7,
    material: "Platinum & Ceylon Sapphire",
    description: "A mesmerizing Ceylon sapphire surrounded by a halo of brilliant-cut diamonds, suspended from a delicate platinum chain. The deep blue of the sapphire creates a stunning contrast with the white diamonds.",
    specs: { sapphire: "3.2ct Ceylon", diamonds: "1.8ct total", metal: "Platinum 950", chain: "42cm" },
    featured: false,
  },
  {
    id: 8,
    name: "Diamond Tennis Bracelet",
    category: "Bracelets",
    price: 9800,
    image: goldBracelet,
    badge: "Bestseller",
    rating: 5.0,
    reviews: 56,
    material: "18K White Gold & Diamonds",
    description: "The quintessential tennis bracelet — 46 perfectly matched round brilliant diamonds set in 18K white gold. Each stone is hand-set in a four-prong basket setting for maximum light exposure and sparkle.",
    specs: { diamonds: "46 stones", carat: "12ct total", gold: "18K White", length: "18cm" },
    featured: false,
  },
  {
    id: 9,
    name: "Rose Gold Hoop Earrings",
    category: "Earrings",
    price: 2800,
    image: diamondEarrings,
    badge: "Limited",
    rating: 4.7,
    reviews: 33,
    material: "18K Rose Gold",
    description: "These elegant hoop earrings are crafted from solid 18K rose gold with a high-polish finish. The seamless design and comfortable latch-back closure make them perfect for everyday luxury.",
    specs: { diameter: "35mm", width: "3mm", gold: "18K Rose", closure: "Latch-back" },
    featured: false,
  },
  {
    id: 10,
    name: "Emerald Cut Solitaire",
    category: "Rings",
    price: 15600,
    image: goldRings,
    badge: "Signature",
    rating: 5.0,
    reviews: 5,
    material: "Platinum & Diamond",
    description: "A showstopping emerald-cut diamond set in a sleek platinum band. The step-cut facets create a hall-of-mirrors effect that is both modern and timeless. Accompanied by GIA certification.",
    specs: { diamond: "2.1ct emerald cut", clarity: "VS1", color: "F", certification: "GIA" },
    featured: false,
  },
  {
    id: 11,
    name: "Layered Gold Necklace",
    category: "Necklaces",
    price: 4500,
    image: goldCollection,
    badge: "New",
    rating: 4.8,
    reviews: 14,
    material: "18K Yellow Gold",
    description: "Three delicate chains of varying lengths, each adorned with a unique charm — a star, a crescent moon, and a sun. This celestial-inspired piece adds a touch of whimsy to any outfit.",
    specs: { chains: "3 layers", lengths: "40/45/50cm", charms: "Star, Moon, Sun", gold: "18K Yellow" },
    featured: false,
  },
  {
    id: 12,
    name: "Pearl & Diamond Earrings",
    category: "Earrings",
    price: 6100,
    image: diamondEarrings,
    badge: "Exclusive",
    rating: 4.9,
    reviews: 11,
    material: "18K Gold, South Sea Pearls & Diamonds",
    description: "Lustrous South Sea pearls drop from diamond-studded caps in these elegant earrings. The warm glow of the pearls combined with the fire of the diamonds creates a captivating interplay of light.",
    specs: { pearls: "12mm South Sea", diamonds: "0.8ct total", gold: "18K Yellow", drop: "25mm" },
    featured: false,
  },
];

export const categories = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Watches",
  "Pendants",
  "Collections",
];

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getNewArrivals() {
  return products.filter((p) => p.badge === "New");
}

export function getBestsellers() {
  return products.filter((p) => p.badge === "Bestseller");
}
