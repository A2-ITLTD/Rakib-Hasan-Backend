/*
 * Seeds real content (translated/summarised from public/RakibHasanPortfolio.pdf)
 * for the M/S. MD. RAKIB HASAN "Projects" page:
 *  - Replaces the stale eCommerce-agency PortfolioCategory list with real work categories
 *  - Inserts the 17 documented government contracts/work experiences as Portfolio items
 *  - Seeds the ProjectsPage singleton (hero, stats, work categories, timeline, CTA)
 *
 * Safe to re-run: skips Portfolio/PortfolioCategory seeding if those collections
 * already have data (so it won't duplicate anything an admin has since added).
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Portfolio = require("../models/Portfolio");
const PortfolioCategory = require("../models/PortfolioCategory");
const ProjectsPage = require("../models/ProjectsPage");

const PLACEHOLDER_IMAGE = "/assets/backgroundImg/office-background.jpg";

const CATEGORIES = [
  { name: "construction", displayName: "Construction" },
  { name: "government-supply", displayName: "Government Supply" },
  { name: "general-merchant", displayName: "General Merchant" },
  { name: "auction-services", displayName: "Auction Services" },
  { name: "procurement", displayName: "Procurement" },
  { name: "infrastructure", displayName: "Infrastructure" },
];

const CONTRACTS = [
  {
    title: "Vehicle & Equipment Supply — Khulna News Print Mills Ltd",
    description:
      "Ongoing supply of 79 categories of items to Khulna News Print Mills Ltd, including cargo vehicles, buses, trucks, jeeps, a mobile crane and a forklift.",
    category: ["Government Supply"],
    client: "Khulna News Print Mills Ltd",
    location: "Khulna",
    status: "Ongoing",
    featured: true,
  },
  {
    title: "Prisoners' Uniform & Supply — Gaibandha Correctional Facility",
    description:
      "Supply of prisoners' uniforms and other essential items to the district correctional facility (Karagar) under the Deputy Commissioner's office, Gaibandha.",
    category: ["Government Supply"],
    client: "Office of the Deputy Commissioner, Gaibandha",
    location: "Gaibandha",
    status: "Completed",
    completionYear: "2024",
  },
  {
    title: "Prisoners' Uniform & Supply — Habiganj Correctional Facility",
    description:
      "Supply of prisoners' uniforms and other essential items to the district correctional facility (Karagar) under the Deputy Commissioner's office, Habiganj.",
    category: ["Government Supply"],
    client: "Office of the Deputy Commissioner, Habiganj",
    location: "Habiganj",
    status: "Completed",
    completionYear: "2023",
  },
  {
    title: "Interior Woodwork — Jashore Govt. Mohila College",
    description:
      "Decorative wooden ceiling and wall panelling, student table and chair units, and complete dismantling/cleaning works at Jashore Government Mohila College.",
    category: ["Construction"],
    client: "Jashore Govt. Mohila College",
    location: "Jashore",
    status: "Completed",
    featured: true,
  },
  {
    title: "Prisoners' Uniform & Supply — Jashore Correctional Facility",
    description:
      "Supply of prisoners' uniforms and other essential items to the district correctional facility (Karagar) under the Deputy Commissioner's office, Jashore.",
    category: ["Government Supply"],
    client: "Office of the Deputy Commissioner, Jashore",
    location: "Jashore",
    status: "Completed",
    completionYear: "2022",
  },
  {
    title: "BOP Boundary Wall — 49 BGB Battalion",
    description:
      "Construction of a security boundary wall with barbed-wire fencing at the Dhanshakhola Border Outpost (BOP) under the 49 BGB Battalion.",
    category: ["Construction", "Infrastructure"],
    client: "49 BGB Battalion, Jashore",
    location: "Jashore",
    status: "Completed",
  },
  {
    title: "Thana Boundary Wall Repair — Magura District Police",
    description:
      "Repair of the boundary wall including barbed-wire fencing at Magura Sadar Thana.",
    category: ["Construction"],
    client: "Magura District Police",
    location: "Magura",
    status: "Completed",
  },
  {
    title: "Buried-Pipe Irrigation Channel — BADC Minor Irrigation Project",
    description:
      "Construction of a buried-pipe irrigation channel for the Boramara-2 (2-cusec) replacement scheme, including construction of a pump house, under BADC's Minor Irrigation Development Project.",
    category: ["Infrastructure"],
    client: "Bangladesh Agricultural Development Corporation (BADC)",
    location: "Narail Sadar Upazila, Narail",
    status: "Completed",
    featured: true,
  },
  {
    title: "Rural HBB Road Construction — Keshabpur & Manirampur",
    description:
      "Herringbone Bond (HBB) road construction connecting several villages under a rural infrastructure development project.",
    category: ["Infrastructure"],
    client: "Rural Infrastructure Development Project",
    location: "Jashore",
    status: "Completed",
    completionYear: "2020",
  },
  {
    title: "Laptop Procurement — Assistant Commissioner (Land), Jashore Sadar",
    description:
      "Supply of 13 laptops for the Union Land Offices under the Assistant Commissioner (Land), Jashore Sadar Upazila.",
    category: ["Procurement"],
    client: "Office of the Assistant Commissioner (Land), Jashore Sadar",
    location: "Jashore",
    status: "Completed",
    completionYear: "2020",
  },
  {
    title: "Roadside Tree Auction — Social Forestry Division, Jashore",
    description:
      "Auction sale and removal of roadside trees under a lot-wise tender.",
    category: ["Auction Services"],
    client: "Divisional Forest Officer, Social Forestry Division, Jashore",
    location: "Jashore",
    status: "Completed",
    completionYear: "2020",
  },
  {
    title: "Rural HBB Road Construction — Sharsha Upazila",
    description:
      "Herringbone Bond (HBB) road construction from Bagachra to G.G.C. High School in Gashaipur Union.",
    category: ["Infrastructure"],
    client: "Upazila Election Office, Sharsha",
    location: "Sharsha, Jashore",
    status: "Completed",
    completionYear: "2019",
  },
  {
    title: "Standing Timber Auction — Roads & Highways Department",
    description:
      "Auction purchase of standing trees along road reserves, with agreement completed after payment of tree value, income tax and VAT.",
    category: ["Auction Services"],
    client: "Roads & Highways Department (Western Zone), Rajshahi",
    location: "Rajshahi",
    status: "Completed",
    completionYear: "2019",
  },
  {
    title: "Rural HBB Road Construction — Jhikargacha",
    description:
      "Herringbone Bond (HBB) road construction (approx. 1,350m) in Panisara Union under the Upazila Project Implementation Officer.",
    category: ["Infrastructure"],
    client: "Upazila Project Implementation Officer, Jhikargacha",
    location: "Jhikargacha, Jashore",
    status: "Completed",
    completionYear: "2020",
  },
  {
    title: "Paved Road & Discharge Bed — Mujibnagar Agricultural Development",
    description:
      "Construction of a paved road (approx. 1,000m) and discharge bed for a 5-cusec pump house under the Mujibnagar Integrated Development Corporation Agricultural Development Project.",
    category: ["Infrastructure", "Construction"],
    client: "Bangladesh Krishi Unnayan Corporation",
    location: "Mujibnagar, Kushtia",
    status: "Completed",
    completionYear: "2017",
  },
  {
    title: "Rural Road Bridge/Culvert Construction — Avoynagar",
    description:
      "Construction of a rural road bridge/culvert (approx. 15m span) under a disaster management infrastructure scheme.",
    category: ["Infrastructure"],
    client: "Upazila Project Implementation Officer, Avoynagar",
    location: "Avoynagar, Jashore",
    status: "Completed",
    completionYear: "2016",
  },
  {
    title: "RCC Pipe Canal Construction — BADC Pirojpur/Bagerhat",
    description:
      "Construction of an RCC pipe canal spanning approximately 8.90 km across the Hijla, Muholi and Pirojganj union areas.",
    category: ["Infrastructure"],
    client: "Bangladesh Agricultural Development Corporation (BADC)",
    location: "Bagerhat",
    status: "Completed",
    completionYear: "2016",
  },
];

const PROJECTS_PAGE_CONTENT = {
  hero: {
    label: "Government Contracts",
    heading: "Our Projects",
    highlight: "",
    description:
      "Delivering quality works and supplying essential goods through government contracts across Bangladesh.",
    backgroundImage: "",
  },
  contractsSection: {
    heading: "Recent Government Contracts",
    viewAllLink: "",
  },
  featuredSection: {
    heading: "Featured Government Projects",
    viewAllLink: "",
  },
  stats: [
    { value: 17, suffix: "+", label: "Completed Projects" },
    { value: 14, suffix: "+", label: "Years of Experience" },
    { value: 7, suffix: "+", label: "Government Clients" },
    { value: 11, suffix: "+", label: "Districts Coverage" },
  ],
  workCategories: [
    { name: "Construction", icon: "Building2" },
    { name: "Government Supply", icon: "Truck" },
    { name: "General Merchant", icon: "ShoppingCart" },
    { name: "Auction Services", icon: "Gavel" },
    { name: "Procurement", icon: "ClipboardCheck" },
    { name: "Infrastructure", icon: "Milestone" },
  ],
  timeline: [
    { year: "2012", label: "Company Established" },
    { year: "2016", label: "1st Class Contractor Enlistment" },
    { year: "2017", label: "Agricultural Infrastructure Projects" },
    { year: "2019", label: "Expanded Supply Operations" },
    { year: "2020", label: "Multiple Rural Road & Procurement Projects" },
    { year: "2023", label: "Correctional Facility Supply Contracts" },
    { year: "2024", label: "Continuous Growth & Excellence" },
    { year: "2026", label: "Moving Forward Together" },
  ],
  cta: {
    heading: "Let's Build a Better Tomorrow Together",
    description:
      "We are ready to deliver quality projects and supply solutions for your next requirement.",
    buttonText: "Contact Us",
    buttonLink: "/contact",
    secondaryButtonText: "Download Company Profile",
    secondaryButtonLink: "/RakibHasanPortfolio.pdf",
  },
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.\n");

  // --- Categories ---
  const existingCategoryCount = await PortfolioCategory.countDocuments();
  const portfolioCount = await Portfolio.countDocuments();

  if (existingCategoryCount > 0 && portfolioCount === 0) {
    // Old eCommerce-template categories are unused (no portfolio items reference them) — safe to replace.
    await PortfolioCategory.deleteMany({});
    console.log(`Removed ${existingCategoryCount} stale categories.`);
  }

  if ((await PortfolioCategory.countDocuments()) === 0) {
    await PortfolioCategory.insertMany(CATEGORIES);
    console.log(`Inserted ${CATEGORIES.length} government work categories.`);
  } else {
    console.log("PortfolioCategory already populated — skipping.");
  }

  // --- Contracts / Portfolio items ---
  if (portfolioCount === 0) {
    const docs = CONTRACTS.map((c) => ({
      title: c.title,
      description: c.description,
      category: c.category,
      image: PLACEHOLDER_IMAGE,
      images: [],
      client: c.client,
      location: c.location,
      status: c.status,
      completionYear: c.completionYear || "",
      featured: !!c.featured,
      isActive: true,
    }));

    await Portfolio.insertMany(docs);
    console.log(`Inserted ${docs.length} government contract/project records.`);
    console.log(
      "NOTE: seeded with a generic placeholder image — replace with real project photos via Dashboard > Manage Contracts/Projects.",
    );
  } else {
    console.log(`Portfolio already has ${portfolioCount} item(s) — skipping contract seed.`);
  }

  // --- Projects page settings (singleton, safe to upsert) ---
  let projectsPage = await ProjectsPage.findOne();
  if (!projectsPage) {
    projectsPage = await ProjectsPage.create(PROJECTS_PAGE_CONTENT);
    console.log("Created ProjectsPage settings document.");
  } else {
    Object.assign(projectsPage, PROJECTS_PAGE_CONTENT);
    await projectsPage.save();
    console.log("Updated existing ProjectsPage settings document.");
  }

  console.log("\nDone.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
