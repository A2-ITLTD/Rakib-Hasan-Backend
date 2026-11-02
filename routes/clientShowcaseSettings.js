const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getClientShowcaseSettings,
  getAdminClientShowcaseSettings,
  updateClientShowcaseSettings,
} = require("../controllers/clientShowcaseSettingsController");

const router = express.Router();

router.get("/", getClientShowcaseSettings);

router.get(
  "/admin",
  authMiddleware,
  requireModuleAccess("client-showcase"),
  getAdminClientShowcaseSettings,
);

router.put(
  "/",
  authMiddleware,
  requireModuleAccess("client-showcase"),
  updateClientShowcaseSettings,
);

module.exports = router;
