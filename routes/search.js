const express = require("express");
const Service = require("../models/Service");
const Portfolio = require("../models/Portfolio");
const News = require("../models/News");

const router = express.Router();

const escapeRegex = (value) =>
  String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const EMPTY_RESULTS = { services: [], portfolio: [], news: [] };
const EMPTY_COUNTS = { services: 0, portfolio: 0, news: 0, total: 0 };

// GET /api/search?q=...&limit=6 - Search across services, portfolio and news
router.get("/", async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 6, 1), 50);

    if (!q) {
      return res.json({
        success: true,
        query: "",
        results: EMPTY_RESULTS,
        counts: EMPTY_COUNTS,
      });
    }

    const re = new RegExp(escapeRegex(q), "i");

    const [services, portfolio, news] = await Promise.all([
      Service.find({
        isActive: true,
        $or: [{ title: re }, { description: re }, { category: re }],
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select("title description path image category")
        .lean(),
      Portfolio.find({
        isActive: true,
        $or: [{ title: re }, { description: re }, { client: re }],
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select("title description image category")
        .lean(),
      News.find({
        status: "published",
        $or: [{ title: re }, { excerpt: re }, { category: re }],
      })
        .sort({ publishDate: -1 })
        .limit(limit)
        .select("title slug excerpt featuredImage category")
        .lean(),
    ]);

    const results = {
      services: services.map((item) => ({
        id: item._id,
        type: "services",
        title: item.title,
        excerpt: item.description,
        image: item.image || "",
        url: item.path,
      })),
      portfolio: portfolio.map((item) => ({
        id: item._id,
        type: "portfolio",
        title: item.title,
        excerpt: item.description,
        image: item.image || "",
        url: "/projects",
      })),
      news: news.map((item) => ({
        id: item._id,
        type: "news",
        title: item.title,
        excerpt: item.excerpt,
        image: item.featuredImage || "",
        url: `/news/${item.slug}`,
      })),
    };

    const counts = {
      services: results.services.length,
      portfolio: results.portfolio.length,
      news: results.news.length,
    };
    counts.total = counts.services + counts.portfolio + counts.news;

    res.json({ success: true, query: q, results, counts });
  } catch (err) {
    console.error("GET /api/search error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
