const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getContactSettings,
  getAdminContactSettings,
  updateContactSettings,
} = require("../controllers/contactSettingsController");

const router = express.Router();

router.get("/", getContactSettings);

router.get("/admin", authMiddleware, requireModuleAccess("contact-page"), getAdminContactSettings);

router.put("/", authMiddleware, requireModuleAccess("contact-page"), updateContactSettings);

module.exports = router;
