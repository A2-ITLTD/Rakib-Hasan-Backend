const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getSmartFeatureSettings,
  updateSmartFeatureSettings,
} = require("../controllers/smartFeatureSettingsController");

const router = express.Router();

router.get("/", getSmartFeatureSettings);

router.put(
  "/",
  authMiddleware,
  requireModuleAccess("smart-features"),
  updateSmartFeatureSettings,
);

module.exports = router;
