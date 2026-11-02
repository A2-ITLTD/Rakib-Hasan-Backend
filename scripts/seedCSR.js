/*
 * Seeds sample content for the CSR (Corporate Social Responsibility) page:
 *  - CSR singleton: header text + chairman's message
 *  - CSRActivity collection: individual activities, each with its own /csr/[slug] details page
 * Safe to re-run: upserts the CSR singleton, and only inserts activities if none exist yet
 * (so it won't duplicate or overwrite content an admin has since added/edited).
 */
require("dotenv").config();
const mongoose = require("mongoose");
const CSR = require("../models/CSR");
const CSRActivity = require("../models/CSRActivity");

const PLACEHOLDER_IMAGE = "/assets/backgroundImg/office-background.jpg";

const CSR_PAGE_CONTENT = {
  label: "Giving Back",
  heading: "Corporate Social Responsibility",
  description:
    "Beyond our contracts and projects, we invest in the communities we work in — supporting education, disaster relief, environmental sustainability and public health initiatives across Bangladesh.",
  chairman: {
    image: PLACEHOLDER_IMAGE,
    name: "Alhaj Sufi Mohamed Mizanur Rahman",
    designation: "Chairman",
    message:
      "We believe true success is measured not only by the projects we deliver, but by the positive difference we make in the lives of the communities we serve. Corporate social responsibility is not a separate effort for us — it is woven into who we are as a company.",
  },
};

const ACTIVITIES = [
  {
    title: "Tree Plantation Drive",
    excerpt:
      "Planted native trees along rural roads and school premises in Jashore district to support environmental sustainability and reduce soil erosion.",
    content:
      "<p>As part of our ongoing commitment to environmental sustainability, we organized a large-scale tree plantation drive across Jashore district, covering rural roadsides and several school premises.</p><p>Employees and local volunteers planted hundreds of native saplings, chosen for their suitability to the local climate and their long-term benefit to soil stability and air quality. The initiative also included an awareness session for students on the importance of environmental conservation.</p>",
    image: PLACEHOLDER_IMAGE,
    date: "2025",
    order: 1,
  },
  {
    title: "Flood Relief Support",
    excerpt:
      "Distributed emergency food packages, drinking water and medical supplies to flood-affected families in southwestern Bangladesh.",
    content:
      "<p>When seasonal flooding displaced hundreds of families across southwestern Bangladesh, our team mobilized an emergency relief effort within 48 hours.</p><p>We distributed food packages, safe drinking water, and basic medical supplies to affected households, prioritizing families with children and elderly members. The relief operation was carried out in coordination with local administration to ensure aid reached the most vulnerable communities first.</p>",
    image: PLACEHOLDER_IMAGE,
    date: "2024",
    order: 2,
  },
  {
    title: "Free Skills Training for Local Youth",
    excerpt:
      "Sponsored a vocational training program teaching basic construction and equipment-handling skills to unemployed youth in our project areas.",
    content:
      "<p>Recognizing the need for accessible vocational training, we sponsored a skills development program aimed at unemployed youth in our project operating areas.</p><p>Participants received hands-on training in basic construction techniques and safe equipment handling, taught by our own site supervisors and engineers. Several graduates of the program have since been engaged in our ongoing project work.</p>",
    image: PLACEHOLDER_IMAGE,
    date: "2023",
    order: 3,
  },
  {
    title: "Blood Donation Camp",
    excerpt:
      "Organized a company-wide blood donation camp in partnership with local hospitals to help address regional blood shortages.",
    content:
      "<p>In partnership with local hospitals, we organized a company-wide blood donation camp to help address recurring regional blood shortages.</p><p>Employees, business partners and community members came together for the day-long event, resulting in a meaningful contribution to the local blood bank reserves used for emergency and surgical care.</p>",
    image: PLACEHOLDER_IMAGE,
    date: "2023",
    order: 4,
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.\n");

  // --- CSR page settings + chairman message (singleton, safe to upsert) ---
  let csrPage = await CSR.findOne();
  if (!csrPage) {
    csrPage = await CSR.create(CSR_PAGE_CONTENT);
    console.log("Created CSR page settings document.");
  } else {
    Object.assign(csrPage, CSR_PAGE_CONTENT);
    await csrPage.save();
    console.log("Updated existing CSR page settings document.");
  }

  // --- CSR activities (separate collection, each with its own details page) ---
  const activityCount = await CSRActivity.countDocuments();
  if (activityCount === 0) {
    for (const activity of ACTIVITIES) {
      await CSRActivity.create({ ...activity, status: "published" });
    }
    console.log(`Inserted ${ACTIVITIES.length} CSR activities.`);
  } else {
    console.log(
      `CSRActivity already has ${activityCount} item(s) — skipping activity seed.`,
    );
  }

  console.log(
    "\nNOTE: seeded with a generic placeholder image — replace with real photos via Dashboard > Pages > CSR Page / CSR Activities.",
  );
  console.log("\nDone.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
