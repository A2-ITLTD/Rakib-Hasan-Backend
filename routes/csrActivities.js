const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getCSRActivities,
  getCSRActivityBySlug,
  getAdminCSRActivities,
  getAdminCSRActivityById,
  createCSRActivity,
  updateCSRActivity,
  deleteCSRActivity,
} = require("../controllers/csrActivityController");

const router = express.Router();

router.get("/", getCSRActivities);

router.get("/admin/all", authMiddleware, requireModuleAccess("csr"), getAdminCSRActivities);
router.get("/admin/:id", authMiddleware, requireModuleAccess("csr"), getAdminCSRActivityById);

router.post("/", authMiddleware, requireModuleAccess("csr"), createCSRActivity);

router.put("/:id", authMiddleware, requireModuleAccess("csr"), updateCSRActivity);

router.delete("/:id", authMiddleware, adminMiddleware, deleteCSRActivity);

router.get("/:slug", getCSRActivityBySlug);

module.exports = router;
