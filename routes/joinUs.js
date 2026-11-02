const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getJoinUs,
  getAdminJoinUs,
  updateJoinUs,
} = require("../controllers/joinUsController");

const router = express.Router();

router.get("/", getJoinUs);

router.get("/admin", authMiddleware, requireModuleAccess("join-us"), getAdminJoinUs);

router.put("/", authMiddleware, requireModuleAccess("join-us"), updateJoinUs);

module.exports = router;
