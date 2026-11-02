const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getFooterSection,
  getAdminFooterSection,
  updateFooter,
} = require("../controllers/footerController");

const router = express.Router();

router.get("/", getFooterSection);

router.get("/admin", authMiddleware, requireModuleAccess("footer"), getAdminFooterSection);

router.put("/", authMiddleware, requireModuleAccess("footer"), updateFooter);

module.exports = router;
