const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getNews,
  getNewsBySlug,
  getAdminNews,
  getAdminNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

const router = express.Router();

router.get("/", getNews);

router.get("/admin/all", authMiddleware, requireModuleAccess("news"), getAdminNews);
router.get("/admin/:id", authMiddleware, requireModuleAccess("news"), getAdminNewsById);

router.post("/", authMiddleware, requireModuleAccess("news"), createNews);

router.put("/:id", authMiddleware, requireModuleAccess("news"), updateNews);

router.delete("/:id", authMiddleware, adminMiddleware, deleteNews);

router.get("/:slug", getNewsBySlug);

module.exports = router;
