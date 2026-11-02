const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getSiteSettings,
  getAdminSiteSettings,
  updateSiteSettings,
} = require("../controllers/siteSettingsController");

const router = express.Router();

router.get("/", getSiteSettings);

router.get("/admin", authMiddleware, requireModuleAccess("site-branding"), getAdminSiteSettings);

router.put("/", authMiddleware, requireModuleAccess("site-branding"), updateSiteSettings);

module.exports = router;
