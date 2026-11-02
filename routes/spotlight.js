const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getSpotlight,
  getAdminSpotlight,
  updateSpotlight,
} = require("../controllers/spotlightController");

const router = express.Router();

router.get("/", getSpotlight);

router.get("/admin", authMiddleware, requireModuleAccess("spotlight"), getAdminSpotlight);

router.put("/", authMiddleware, requireModuleAccess("spotlight"), updateSpotlight);

module.exports = router;
