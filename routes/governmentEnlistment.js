const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getGovernmentEnlistment,
  getAdminGovernmentEnlistment,
  updateGovernmentEnlistment,
} = require("../controllers/governmentEnlistmentController");

const router = express.Router();

router.get("/", getGovernmentEnlistment);

router.get(
  "/admin",
  authMiddleware,
  requireModuleAccess("government-enlistment"),
  getAdminGovernmentEnlistment,
);

router.put(
  "/",
  authMiddleware,
  requireModuleAccess("government-enlistment"),
  updateGovernmentEnlistment,
);

module.exports = router;
