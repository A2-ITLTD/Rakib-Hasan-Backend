const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getAboutPage,
  getAdminAboutPage,
  updateAboutPage,
} = require("../controllers/aboutController");

const router = express.Router();

router.get("/", getAboutPage);

router.get("/admin", authMiddleware, requireModuleAccess("about"), getAdminAboutPage);

router.put("/", authMiddleware, requireModuleAccess("about"), updateAboutPage);

module.exports = router;
