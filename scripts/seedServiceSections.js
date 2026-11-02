/**
 * Populates each service with realistic "sections" (sub-pages). Each section
 * gets its own detail page at /services/<service>/<section-slug>.
 * Matches services by title (case-insensitive) and replaces their sections.
 *
 * Content is grounded in the company's real portfolio; images are left empty
 * so they can be uploaded from the dashboard.
 *
 * Run:  node scripts/seedServiceSections.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../models/Service");

const s = (slug, title, icon, description, features, details = "") => ({
  slug,
  title,
  icon,
  color: "bg-[#0066ff]",
  image: "",
  images: [],
  description,
  features,
  process: [],
  stats: [],
  details,
});

const sections = {
  Construction: [
    s(
      "building-construction",
      "Building Construction",
      "Server",
      "Construction and renovation of RCC buildings and institutional facilities for government departments.",
      [
        "RCC multi-storey buildings",
        "School, college and academic buildings",
        "Health facility buildings",
        "Renovation and extension works",
      ],
      "We construct and renovate RCC buildings for educational, health and administrative institutions across Bangladesh. All works follow EED and PWD specifications, with proper documentation and joint measurement from foundation to finishing.",
    ),
    s(
      "boundary-wall-site-works",
      "Boundary Wall & Site Works",
      "Server",
      "Boundary walls, gates and perimeter works for government establishments.",
      [
        "RCC and brick boundary walls",
        "Main gates and guard posts",
        "Wall repair and height raising",
        "Perimeter grading and finishing",
      ],
      "Our boundary and site works secure government premises with durable walls, gates and perimeter finishing. A representative work is the Thana Boundary Wall Repair carried out for Magura District Police.",
    ),
    s(
      "road-construction",
      "Road Construction",
      "TrendingUp",
      "Rural and access road construction including HBB and bituminous surfaces.",
      [
        "Herringbone Bond Brick (HBB) roads",
        "Bituminous carpeting",
        "Rural access roads",
        "Road repair and maintenance",
      ],
      "We build and maintain rural and access roads that connect communities. A recent example is the Rural HBB Road Construction completed in Sharsha Upazila, delivered on schedule and to specification.",
    ),
  ],

  Infrastructure: [
    s(
      "irrigation-systems",
      "Irrigation Systems",
      "Database",
      "Buried-pipe irrigation channels and minor irrigation works for agencies such as BADC.",
      [
        "Buried-pipe irrigation channels",
        "Minor irrigation structures",
        "Water conveyance systems",
        "BADC project works",
      ],
      "We deliver irrigation infrastructure that improves water efficiency for farming communities. Our Buried-Pipe Irrigation Channel under the BADC Minor Irrigation Project is a representative example.",
    ),
    s(
      "drainage-earthworks",
      "Drainage & Earthworks",
      "Server",
      "Drainage systems, embankments and earthworks for rural development.",
      [
        "Surface and sub-surface drainage",
        "Embankment construction",
        "Excavation and filling",
        "Slope protection",
      ],
      "Our drainage and earthworks manage water flow and stabilise land for infrastructure and agricultural projects, executed with quality materials and close supervision.",
    ),
    s(
      "site-development",
      "Site Development",
      "Server",
      "Land grading and site preparation for institutional and infrastructure projects.",
      [
        "Land grading and levelling",
        "Site clearing and preparation",
        "Access and internal roads",
        "Utility trenching",
      ],
      "We prepare project sites end to end — clearing, grading, internal roads and utility trenching — so that construction can begin on solid, well-drained ground.",
    ),
  ],

  Supply: [
    s(
      "it-office-equipment",
      "IT & Office Equipment",
      "Server",
      "Procurement of laptops, computers and peripherals for government offices.",
      [
        "Laptops and desktop computers",
        "Printers and peripherals",
        "Networking equipment",
        "Warranty and after-sales support",
      ],
      "We supply IT and office equipment to government offices with genuine products and full documentation. A recent example is the Laptop Procurement for the Assistant Commissioner (Land), Jashore Sadar.",
    ),
    s(
      "uniforms-textiles",
      "Uniforms & Textiles",
      "ShoppingBag",
      "Supply of uniforms and textile goods for government institutions.",
      [
        "Institutional and staff uniforms",
        "Bulk textile supply",
        "Quality-checked fabrics",
        "Timely bulk delivery",
      ],
      "We supply uniforms and textiles to institutions at scale with consistent quality. Our Prisoners' Uniform & Supply for the Gaibandha Correctional Facility is a representative contract.",
    ),
    s(
      "food-grain-general-supply",
      "Food Grain & General Supply",
      "ShoppingCart",
      "Food grain supply and general merchandise for institutions.",
      [
        "Food grain supply (DG Food)",
        "Furniture and fixtures",
        "Office consumables",
        "General merchandise",
      ],
      "As an enlisted supplier and general merchant, we handle food grain and general procurement for institutions with competitive, compliant rates and complete challan and billing.",
    ),
  ],

  Events: [
    s(
      "ceremonies-inaugurations",
      "Ceremonies & Inaugurations",
      "Share2",
      "Management of official ceremonies, inaugurations and foundation-laying events.",
      [
        "Inauguration ceremonies",
        "Foundation-laying events",
        "Official programs and seminars",
        "National day and anniversary events",
      ],
      "We plan and run official ceremonies for government departments — from inaugurations and foundation-laying to seminars — handling every detail so the occasion runs smoothly.",
    ),
    s(
      "logistics-stage-setup",
      "Logistics & Stage Setup",
      "Store",
      "Venue, stage, décor and audio-visual arrangements for events.",
      [
        "Stage and pandal setup",
        "Décor and branding",
        "Sound and audio-visual systems",
        "Seating and on-site logistics",
      ],
      "Our logistics team arranges venues, stages, décor and audio-visual systems, ensuring events are well-organised, on-brand and comfortable for guests.",
    ),
    s(
      "protocol-guest-management",
      "Protocol & Guest Management",
      "Tag",
      "Guest coordination and protocol handling for government programs.",
      [
        "Guest invitations and coordination",
        "Protocol handling",
        "Registration and reception",
        "On-site supervision",
      ],
      "We manage guest coordination and official protocol for government programs, from invitations and reception to on-the-day supervision.",
    ),
  ],

  CSR: [
    s(
      "education-support",
      "Education Support",
      "TrendingUp",
      "Scholarships and educational support for underprivileged students.",
      [
        "Student scholarships",
        "School supplies and books",
        "Institutional support",
        "Skill development programs",
      ],
      "We support education in the communities we serve through scholarships, learning materials and institutional support, helping students stay in school and build their futures.",
    ),
    s(
      "disaster-relief",
      "Disaster Relief",
      "Share2",
      "Emergency aid and relief during floods and natural disasters.",
      [
        "Emergency food and water",
        "Shelter materials",
        "Medical aid",
        "Rehabilitation support",
      ],
      "When disasters strike, we respond quickly with food, water, shelter and medical aid, and stay involved through rehabilitation to help communities recover.",
    ),
    s(
      "environment-public-health",
      "Environment & Public Health",
      "Palette",
      "Tree plantation, sanitation and public health initiatives.",
      [
        "Tree plantation drives",
        "Clean water and sanitation",
        "Health camps",
        "Awareness programs",
      ],
      "We invest in environmental sustainability and public health through tree plantation, sanitation, health camps and awareness programs across the areas we work in.",
    ),
  ],

  Ongoing: [
    s(
      "active-construction-projects",
      "Active Construction Projects",
      "TrendingUp",
      "Construction works currently under execution across departments.",
      [
        "Live site supervision",
        "Progress reporting",
        "Quality monitoring",
        "Milestone tracking",
      ],
      "Our active construction projects are supervised on-site with regular progress reporting, quality monitoring and milestone tracking until final handover.",
    ),
    s(
      "active-supply-contracts",
      "Active Supply Contracts",
      "ShoppingCart",
      "Supply and procurement contracts currently being fulfilled.",
      [
        "Order fulfilment tracking",
        "Timely delivery",
        "Complete documentation",
        "Client coordination",
      ],
      "Our active supply contracts are tracked from order to delivery, with complete documentation and close coordination with client departments.",
    ),
  ],
};

(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  for (const [title, list] of Object.entries(sections)) {
    const withOrder = list.map((sec, index) => ({ ...sec, order: index }));
    const result = await Service.findOneAndUpdate(
      { title: new RegExp(`^${title}$`, "i") },
      { $set: { sections: withOrder } },
      { new: true },
    );
    if (result) {
      console.log(`✅ ${title}: ${withOrder.length} sections`);
    } else {
      console.log(`⚠️  ${title}: no matching service — skipped`);
    }
  }

  console.log("\nDone.");
  process.exit(0);
})().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
