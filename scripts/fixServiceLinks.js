/**
 * Points navbar + footer "Services" links directly at the service detail page
 * (/services/<slug>) instead of the intermediate category listing page
 * (/services/category/<name>).
 *
 * Run:  node scripts/fixServiceLinks.js
 */
require("dotenv").config();
const mongoose = require("mongoose");

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
  const db = mongoose.connection.db;

  // ---- Navbar categories ----
  const navCol = db.collection("navbarcategories");
  const navItems = await navCol.find().toArray();
  for (const item of navItems) {
    const direct = `/services/${item.name}`;
    if (item.link === direct) {
      console.log(`= navbar ${item.name}: already ${direct}`);
      continue;
    }
    await navCol.updateOne({ _id: item._id }, { $set: { link: direct } });
    console.log(`✅ navbar ${item.name}: "${item.link || "(none)"}" -> "${direct}"`);
  }

  // ---- Footer service column ----
  const footerCol = db.collection("footers");
  const footers = await footerCol.find().toArray();
  for (const footer of footers) {
    let changed = false;
    const columns = (footer.columns || []).map((col) => {
      if (!/service/i.test(col.title || "")) return col;
      const links = (col.links || []).map((link) => {
        const direct = `/services/${slugify(link.label)}`;
        const needsFix =
          !link.url ||
          !link.url.trim() ||
          link.url.startsWith("/services/category/");
        if (needsFix && link.label) {
          changed = true;
          console.log(
            `✅ footer ${col.title} / ${link.label}: "${link.url || "(empty)"}" -> "${direct}"`,
          );
          return { ...link, url: direct };
        }
        return link;
      });
      return { ...col, links };
    });

    if (changed) {
      await footerCol.updateOne({ _id: footer._id }, { $set: { columns } });
    } else {
      console.log("= footer: no service links needed fixing");
    }
  }

  console.log("\nDone.");
  process.exit(0);
})().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
