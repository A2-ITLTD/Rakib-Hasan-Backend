const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getSmartFeatures,
  getAdminSmartFeatures,
  createSmartFeature,
  updateSmartFeature,
  deleteSmartFeature,
} = require("../controllers/smartFeaturesController");

const router = express.Router();

router.get("/", getSmartFeatures);

router.get("/admin/all", authMiddleware, requireModuleAccess("smart-features"), getAdminSmartFeatures);

router.post("/", authMiddleware, requireModuleAccess("smart-features"), createSmartFeature);

router.put("/:id", authMiddleware, requireModuleAccess("smart-features"), updateSmartFeature);

router.delete("/:id", authMiddleware, adminMiddleware, deleteSmartFeature);

module.exports = router;
