/**
 * Normalizes service `path` values to the canonical `/services/<slug>` form
 * that the public /services/[slug] route expects. Existing paths were
 * inconsistent (e.g. "service/construction", "CSR", "Events").
 *
 * Run:  node scripts/fixServicePaths.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../models/Service");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  const services = await Service.find().lean();
  for (const s of services) {
    // prefer the category as slug, fall back to the title
    const slug = slugify(s.category) || slugify(s.title);
    const path = `/services/${slug}`;
    if (path === s.path) {
      console.log(`= ${s.title}: already ${path}`);
      continue;
    }
    await Service.updateOne({ _id: s._id }, { $set: { path } });
    console.log(`✅ ${s.title}: "${s.path}" -> "${path}"`);
  }

  console.log("\nDone.");
  process.exit(0);
})().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
