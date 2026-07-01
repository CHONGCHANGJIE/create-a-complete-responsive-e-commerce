import {
  AirVent,
  Bolt,
  Car,
  Drill,
  Gauge,
  Hammer,
  HardHat,
  Leaf,
  Ruler,
  ShieldCheck,
  Wrench,
  Zap
} from "lucide-react";

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  brand: string;
  category: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  stock: number;
  isNew?: boolean;
  isSale?: boolean;
  image: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
};

export const categories = [
  { name: "Hand Tools", icon: Hammer, description: "Reliable essentials for site and workshop use." },
  { name: "Power Tools", icon: Drill, description: "Cordless and corded performance tools." },
  { name: "Electrical", icon: Zap, description: "Testing, wiring, cable, and installation gear." },
  { name: "Plumbing", icon: Wrench, description: "Pipe work, fittings, valves, and drain tools." },
  { name: "Fasteners", icon: Bolt, description: "Anchors, bolts, screws, rivets, and washers." },
  { name: "Safety Equipment", icon: HardHat, description: "PPE for compliant industrial teams." },
  { name: "Welding", icon: ShieldCheck, description: "Welding protection, clamps, rods, and consumables." },
  { name: "Measuring Tools", icon: Ruler, description: "Layout, calibration, measuring, and leveling." },
  { name: "Gardening", icon: Leaf, description: "Durable outdoor maintenance tools." },
  { name: "Automotive", icon: Car, description: "Garage tools, service kits, and lubricants." },
  { name: "Pneumatics", icon: AirVent, description: "Air tools, hoses, guns, and fittings." },
  { name: "Industrial Supplies", icon: Gauge, description: "Bearings, abrasives, adhesives, and MRO." }
];

export const brands = [
  "Bosch",
  "Makita",
  "DeWalt",
  "Milwaukee",
  "Stanley",
  "SATA",
  "Knipex",
  "Wera",
  "Bahco",
  "Wiha",
  "Hikoki",
  "Total",
  "Ingco"
];

const categoryImageSlugs: Record<string, string> = {
  "Hand Tools": "hand-tools",
  "Power Tools": "power-tools",
  Electrical: "electrical",
  Plumbing: "plumbing",
  Fasteners: "fasteners",
  "Safety Equipment": "safety-equipment",
  Welding: "welding",
  "Measuring Tools": "measuring-tools",
  Gardening: "gardening",
  Automotive: "automotive",
  Pneumatics: "pneumatics",
  "Industrial Supplies": "industrial-supplies"
};

function productImageUrl(category: string) {
  return `/products/${categoryImageSlugs[category] || "industrial-supplies"}.png`;
}

const productNames = [
  ["Power Tools", "18V Brushless Cordless Drill Kit"],
  ["Power Tools", "Compact Impact Driver 1/4 Inch"],
  ["Power Tools", "SDS Plus Rotary Hammer"],
  ["Power Tools", "Angle Grinder 125mm"],
  ["Power Tools", "Jigsaw Variable Speed"],
  ["Power Tools", "Circular Saw 7-1/4 Inch"],
  ["Hand Tools", "Chrome Vanadium Socket Set 72pc"],
  ["Hand Tools", "Adjustable Spanner 10 Inch"],
  ["Hand Tools", "Torque Wrench 1/2 Inch Drive"],
  ["Hand Tools", "Allen Key Ball End Set"],
  ["Hand Tools", "Precision Screwdriver Kit"],
  ["Hand Tools", "Combination Pliers 8 Inch"],
  ["Hand Tools", "Pipe Wrench Heavy Duty 14 Inch"],
  ["Electrical", "Digital Multimeter True RMS"],
  ["Electrical", "Insulated VDE Screwdriver Set"],
  ["Electrical", "Cable Cutter Ratcheting"],
  ["Electrical", "Wire Stripper Automatic"],
  ["Electrical", "Industrial Extension Reel 30m"],
  ["Plumbing", "PVC Pipe Cutter"],
  ["Plumbing", "Basin Wrench Telescopic"],
  ["Plumbing", "Thread Seal Tape Pack"],
  ["Plumbing", "Brass Ball Valve 1/2 Inch"],
  ["Fasteners", "Stainless Steel Hex Bolt Assortment"],
  ["Fasteners", "Wall Anchor Mixed Kit"],
  ["Fasteners", "Self Drilling Screw Box"],
  ["Fasteners", "Blind Rivet Aluminum Pack"],
  ["Safety Equipment", "Vented Safety Helmet"],
  ["Safety Equipment", "Cut Resistant Gloves Level 5"],
  ["Safety Equipment", "Clear Anti-Fog Safety Goggles"],
  ["Safety Equipment", "Steel Toe Work Boots"],
  ["Welding", "Auto Darkening Welding Helmet"],
  ["Welding", "Welding Magnet Holder Set"],
  ["Welding", "MIG Contact Tip Kit"],
  ["Welding", "Leather Welding Gloves"],
  ["Measuring Tools", "Laser Level Green Beam"],
  ["Measuring Tools", "Digital Vernier Caliper 150mm"],
  ["Measuring Tools", "Measuring Tape 8m Magnetic"],
  ["Measuring Tools", "Engineer Square 300mm"],
  ["Gardening", "Bypass Pruner Professional"],
  ["Gardening", "Garden Hose Reel 20m"],
  ["Gardening", "Folding Pruning Saw"],
  ["Gardening", "Steel Garden Rake"],
  ["Automotive", "Hydraulic Bottle Jack 4 Ton"],
  ["Automotive", "Mechanic Creeper Low Profile"],
  ["Automotive", "Lithium Grease Cartridge"],
  ["Automotive", "Oil Filter Wrench Set"],
  ["Pneumatics", "Air Blow Gun Extended Nozzle"],
  ["Pneumatics", "Quick Coupler Pneumatic Fitting Kit"],
  ["Pneumatics", "PU Air Hose 10m"],
  ["Pneumatics", "Mini Air Regulator Gauge"],
  ["Industrial Supplies", "Deep Groove Ball Bearing 6205"],
  ["Industrial Supplies", "Anti-Seize Copper Lubricant"],
  ["Industrial Supplies", "Cutting Disc Metal 125mm Pack"],
  ["Industrial Supplies", "Threadlocker Medium Strength"],
  ["Power Tools", "Brushless Impact Wrench 1/2 Inch"],
  ["Power Tools", "Cordless Oscillating Multi Tool"],
  ["Hand Tools", "Ratchet Combination Wrench Set"],
  ["Hand Tools", "Heavy Duty Hacksaw Frame"],
  ["Electrical", "Clamp Meter AC/DC"],
  ["Plumbing", "Tube Bender 3-in-1"],
  ["Fasteners", "Nylon Lock Nut Assortment"],
  ["Safety Equipment", "Reusable Half Face Respirator"],
  ["Welding", "Chipping Hammer Spring Handle"],
  ["Measuring Tools", "Digital Angle Finder"],
  ["Gardening", "Heavy Duty Lopper"],
  ["Automotive", "Torque Socket Extension Set"],
  ["Pneumatics", "Pneumatic Brad Nailer"],
  ["Industrial Supplies", "Shop Towel Industrial Roll"],
  ["Power Tools", "Heat Gun Digital Control"],
  ["Hand Tools", "Long Nose Pliers 6 Inch"],
  ["Electrical", "Non Contact Voltage Tester"],
  ["Plumbing", "Drain Auger Hand Crank"],
  ["Fasteners", "Chemical Anchor Capsule Pack"],
  ["Safety Equipment", "High Visibility Safety Vest"],
  ["Welding", "Flux Cored Welding Wire"],
  ["Measuring Tools", "Moisture Meter Pin Type"],
  ["Gardening", "Telescopic Hedge Shears"],
  ["Automotive", "Battery Charger Smart 12V"],
  ["Pneumatics", "Air Die Grinder Kit"],
  ["Industrial Supplies", "Machine Leveling Foot Set"],
  ["Power Tools", "Table Saw Jobsite Stand"],
  ["Hand Tools", "Dead Blow Hammer 32oz"],
  ["Electrical", "Cable Tie Stainless Steel Pack"],
  ["Plumbing", "Pipe Deburring Tool"],
  ["Fasteners", "Countersunk Machine Screw Kit"],
  ["Safety Equipment", "Ear Defender 31dB"],
  ["Welding", "Ground Clamp 500A"],
  ["Measuring Tools", "Inspection Mirror LED"],
  ["Automotive", "Bearing Puller 3 Jaw"]
];

export const products: Product[] = productNames.map(([category, name], index) => {
  const brand = brands[index % brands.length];
  const price = Math.round((18 + (index % 17) * 11 + Math.floor(index / 7) * 7) * 100) / 100;
  const isSale = index % 4 === 0;
  const isNew = index % 5 === 0;
  return {
    id: `hh-${String(index + 1).padStart(3, "0")}`,
    slug: `${brand}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name,
    sku: `HH-${brand.slice(0, 3).toUpperCase()}-${String(4100 + index)}`,
    brand,
    category,
    price,
    compareAt: isSale ? Math.round(price * 1.22) : undefined,
    rating: Number((4.1 + (index % 9) * 0.1).toFixed(1)),
    reviews: 18 + index * 3,
    stock: index % 9 === 0 ? 0 : 8 + (index % 23),
    isNew,
    isSale,
    image: productImageUrl(category),
    description: `${brand} ${name} built for demanding hardware buyers, maintenance teams, contractors, and serious workshop users.`,
    features: [
      "Industrial-grade materials with jobsite-ready durability",
      "Ergonomic handling for long work sessions",
      "Quality checked for consistent professional performance"
    ],
    specs: {
      Brand: brand,
      Category: category,
      SKU: `HH-${brand.slice(0, 3).toUpperCase()}-${String(4100 + index)}`,
      Warranty: index % 3 === 0 ? "3 years" : "12 months",
      "Stock Status": index % 9 === 0 ? "Backorder" : "Ready to ship",
      Origin: ["Germany", "Japan", "USA", "Taiwan", "Malaysia"][index % 5]
    }
  };
});

export const testimonials = [
  { name: "Daniel Koh", role: "Facilities Manager", quote: "HardwareHub gives our maintenance team fast comparisons and dependable stock visibility." },
  { name: "Amelia Grant", role: "Electrical Contractor", quote: "The SKU search is a lifesaver when we need repeat orders on a busy site." },
  { name: "Marcus Tan", role: "Workshop Owner", quote: "Premium brands, clear specs, and a checkout flow that does not waste time." }
];

export const brandHighlights = brands.map((name, index) => ({
  name,
  tagline: ["Precision", "Power", "Durability", "Control"][index % 4]
}));

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" }
];
