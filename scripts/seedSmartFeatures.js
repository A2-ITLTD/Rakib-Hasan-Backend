/*
 * Seeds the homepage "Smart Features" section (shown after "Our Clients"):
 *  - SmartFeatureSettings singleton: eyebrow + two-tone heading
 *  - SmartFeature collection: the three feature cards from the design
 * Safe to re-run: upserts the settings singleton, and only inserts cards if
 * none exist yet (so it won't duplicate or overwrite content an admin edited).
 */
require("dotenv").config();
const mongoose = require("mongoose");
const SmartFeature = require("../models/SmartFeature");
const SmartFeatureSettings = require("../models/SmartFeatureSettings");

const SETTINGS = {
  eyebrow: "Features",
  title: "Smart Features, Technology",
  titleAccent: "Driven Systems Designed",
};

const CARDS = [
  {
    style: "light",
    title: "Long-Life Panel Technology",
    description: "Built with advanced material durability for extreme weather.",
    statValue: "25",
    statLabel: "Performance Warranty.",
    order: 1,
  },
  {
    style: "image",
    title: "Optimized Installation Design",
    description: "Strategic placement ensures maximum sunlight absorption.",
    // Background image — replace with a real photo via Dashboard > Smart Features.
    image: "",
    badge: "25-year Performance",
    order: 2,
  },
  {
    style: "dark",
    title: "Live Energy Management",
    description: "Improved energy management with live tracking.",
    statValue: "30%",
    order: 3,
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.\n");

  // --- Section heading (singleton, safe to upsert) ---
  let settings = await SmartFeatureSettings.findOne();
  if (!settings) {
    settings = await SmartFeatureSettings.create(SETTINGS);
    console.log("Created Smart Feature settings document.");
  } else {
    Object.assign(settings, SETTINGS);
    await settings.save();
    console.log("Updated existing Smart Feature settings document.");
  }

  // --- Feature cards (only seed when the collection is empty) ---
  const cardCount = await SmartFeature.countDocuments();
  if (cardCount === 0) {
    await SmartFeature.insertMany(CARDS);
    console.log(`Inserted ${CARDS.length} smart feature cards.`);
  } else {
    console.log(
      `SmartFeature already has ${cardCount} card(s) — skipping card seed.`,
    );
  }

  console.log(
    "\nNOTE: the image-style card has no background photo yet — add one via Dashboard > Homepage > Smart Features > Edit.",
  );
  console.log("\nDone.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
