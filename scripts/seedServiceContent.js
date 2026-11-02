/**
 * Fills the existing service records with real content.
 * Matches by title (case-insensitive) and only updates the content fields
 * (description, features, process, stats, details) — title, path, category,
 * image and icon are left untouched.
 *
 * Run:  node scripts/seedServiceContent.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../models/Service");

// process / stats are stored as "primary | secondary" strings.
const content = {
  Construction: {
    description:
      "General construction and civil works for government departments — buildings, boundary walls, roads and repair works executed to PWD and EED specifications.",
    features: [
      "RCC building construction and renovation",
      "Boundary wall construction and repair",
      "Rural HBB and bituminous road construction",
      "School, college and health facility civil works",
      "Structural repair and maintenance",
      "Work executed to PWD / EED schedule of rates",
    ],
    process: [
      "Tender & estimation | Reviewing BOQ, drawings and site conditions to prepare an accurate estimate.",
      "Planning & mobilization | Scheduling manpower, materials and equipment before site handover.",
      "Execution | Carrying out civil works with qualified supervisors and skilled labour.",
      "Quality & handover | Inspection against specifications, joint measurement and final handover.",
    ],
    stats: [
      "2012 | Serving since",
      "1st Class | Govt. contractor",
      "6+ | Govt. departments",
      "PWD/EED | Specifications",
    ],
    details:
      "As a 1st Class Government Contractor, we undertake civil construction works for departments and institutions across Bangladesh. Our scope ranges from RCC buildings and institutional facilities to boundary walls, rural roads and structural repair.\n\nRepresentative works include the Thana Boundary Wall Repair for Magura District Police and Rural HBB Road Construction in Sharsha Upazila — delivered on schedule and to the required government specifications.\n\nEvery project is executed with proper documentation, joint measurement and compliance with the applicable PWD/EED schedule of rates, ensuring transparency from tender to final handover.",
  },

  Infrastructure: {
    description:
      "Development and rehabilitation of public infrastructure — irrigation channels, water management and rural development works for agencies such as BADC.",
    features: [
      "Buried-pipe irrigation channel installation",
      "Minor irrigation and water management works",
      "Rural development infrastructure",
      "Drainage, earthworks and land grading",
      "Site development for institutional projects",
      "Works for BADC and allied departments",
    ],
    process: [
      "Survey & feasibility | Assessing site conditions, alignment and requirements.",
      "Design coordination | Aligning drawings and BOQ with the client department.",
      "Construction | Executing works with quality materials and supervision.",
      "Commissioning & handover | Testing, measurement and handover to the department.",
    ],
    stats: [
      "BADC | Key client",
      "2012 | Serving since",
      "Rural | Development focus",
      "1st Class | Govt. contractor",
    ],
    details:
      "We deliver public infrastructure that supports agriculture and rural livelihoods. A recent example is the Buried-Pipe Irrigation Channel executed under the BADC Minor Irrigation Project, improving water conveyance efficiency for farming communities.\n\nOur infrastructure scope covers minor irrigation, water management, drainage, earthworks and site development. Each project is coordinated closely with the client department from survey through commissioning, with full measurement and documentation at every stage.",
  },

  Supply: {
    description:
      "Procurement and supply of goods for government institutions — from IT equipment and uniforms to food grain and general merchandise.",
    features: [
      "IT equipment and computer procurement (laptops, peripherals)",
      "Uniforms and textile supply",
      "Food grain supply (Directorate General of Food)",
      "Furniture and office equipment",
      "General merchandise and institutional supplies",
      "Auctioneer services",
    ],
    process: [
      "Requisition review | Understanding item specifications, quantity and delivery terms.",
      "Sourcing & quotation | Procuring quality goods from verified suppliers at competitive rates.",
      "Quality check | Verifying items against specifications before delivery.",
      "Delivery & documentation | Timely delivery with complete challan and billing.",
    ],
    stats: [
      "1st Class | Supplier",
      "2012 | Serving since",
      "Multi-item | Procurement",
      "DG Food | Approved supplier",
    ],
    details:
      "As an enlisted Supplier, General Merchant and Auctioneer, we handle procurement across a wide range of categories for government institutions.\n\nRepresentative supplies include the Prisoners' Uniform & Supply for the Gaibandha Correctional Facility and Laptop Procurement for the Assistant Commissioner (Land), Jashore Sadar.\n\nWe manage the full cycle — sourcing, quality verification, timely delivery and complete documentation — ensuring institutions receive the right goods at competitive, compliant rates.",
  },

  Events: {
    description:
      "Organizing and managing official programs, inaugurations and institutional events for government departments.",
    features: [
      "Government program and ceremony management",
      "Inauguration and foundation-laying events",
      "Stage, décor and logistics setup",
      "Audio-visual and sound arrangements",
      "Guest and protocol coordination",
      "On-site event supervision",
    ],
    process: [
      "Briefing | Understanding the occasion, guest list and departmental protocol.",
      "Planning | Arranging venue, logistics, stage and audio-visual setup.",
      "Execution | Managing the event on the day with a dedicated on-site team.",
      "Wrap-up | Teardown, settlement and post-event reporting.",
    ],
    stats: [
      "End-to-end | Event management",
      "Protocol | Aware",
      "2012 | Serving since",
      "On-site | Supervision",
    ],
    details:
      "We plan and manage official events for government departments and institutions — from inaugurations and foundation-laying ceremonies to seminars and programs.\n\nOur team handles the complete arrangement: venue and stage setup, décor, sound and audio-visual systems, guest and protocol coordination, and on-site supervision throughout the event, so departments can focus on their agenda while we take care of the execution.",
  },

  CSR: {
    description:
      "Beyond our contracts and projects, we invest in the communities we work in — supporting education, disaster relief, environmental sustainability and public health across Bangladesh.",
    features: [
      "Educational support and scholarships",
      "Disaster relief and emergency aid",
      "Environmental sustainability initiatives",
      "Public health programs",
      "Community infrastructure support",
      "Local employment and skill development",
    ],
    process: [
      "Identify | Listening to local communities to understand real needs.",
      "Plan | Designing initiatives with measurable, lasting impact.",
      "Act | Mobilizing resources and volunteers on the ground.",
      "Sustain | Following up to ensure benefits endure.",
    ],
    stats: [
      "Bangladesh | Nationwide reach",
      "Education | Core focus",
      "Relief | Rapid response",
      "Community | First",
    ],
    details:
      "Our responsibility does not end with the projects we deliver. We reinvest in the communities we serve through initiatives in education, disaster relief, environmental sustainability and public health across Bangladesh.\n\nFrom supporting students and responding to disasters to backing local health and environmental efforts, our aim is simple: to leave the communities we work in stronger than we found them.",
  },

  Ongoing: {
    description:
      "A snapshot of the projects currently under execution across government departments in Bangladesh.",
    features: [
      "Live project execution and monitoring",
      "Regular progress reporting",
      "On-site quality supervision",
      "Timeline and milestone tracking",
      "Transparent client communication",
      "Compliance and documentation upkeep",
    ],
    process: [
      "Mobilization | Deploying teams and resources to active sites.",
      "Execution | Carrying out works to schedule and specification.",
      "Monitoring | Tracking progress, quality and milestones.",
      "Reporting | Keeping client departments updated until completion.",
    ],
    stats: [
      "Active | Projects running",
      "On-site | Supervision",
      "Milestone | Tracking",
      "2012 | Serving since",
    ],
    details:
      "This section reflects the works we currently have under execution with various government departments. Each ongoing project is actively supervised on-site, with regular progress reporting, milestone tracking and quality checks.\n\nWe maintain transparent communication with client departments throughout, ensuring every active engagement stays on schedule, on specification and fully documented until final handover.",
  },
};

(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  for (const [title, data] of Object.entries(content)) {
    const result = await Service.findOneAndUpdate(
      { title: new RegExp(`^${title}$`, "i") },
      { $set: data },
      { new: true },
    );
    if (result) {
      console.log(
        `✅ ${title}: ${data.features.length} features, ${data.process.length} steps, ${data.stats.length} stats`,
      );
    } else {
      console.log(`⚠️  ${title}: no matching service found — skipped`);
    }
  }

  console.log("\nDone.");
  process.exit(0);
})().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
