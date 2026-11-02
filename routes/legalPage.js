const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getLegalPage,
  getAdminLegalPage,
  updateLegalPage,
} = require("../controllers/legalPageController");

const router = express.Router();

router.get("/", getLegalPage);

router.get("/admin", authMiddleware, requireModuleAccess("legal-pages"), getAdminLegalPage);

router.put("/", authMiddleware, requireModuleAccess("legal-pages"), updateLegalPage);

module.exports = router;
