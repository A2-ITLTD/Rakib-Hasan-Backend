const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getBanners,
  getAdminBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

const router = express.Router();

router.get("/", getBanners);

router.get("/admin/all", authMiddleware, requireModuleAccess("banner"), getAdminBanners);

router.post("/", authMiddleware, requireModuleAccess("banner"), createBanner);

router.put("/:id", authMiddleware, requireModuleAccess("banner"), updateBanner);

router.delete("/:id", authMiddleware, adminMiddleware, deleteBanner);

module.exports = router;
