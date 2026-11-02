const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getJobOpportunities,
  getAdminJobOpportunities,
  createJobOpportunity,
  updateJobOpportunity,
  deleteJobOpportunity,
} = require("../controllers/jobOpportunityController");

const router = express.Router();

router.get("/", getJobOpportunities);

router.get("/admin/all", authMiddleware, requireModuleAccess("job-opportunities"), getAdminJobOpportunities);

router.post("/", authMiddleware, requireModuleAccess("job-opportunities"), createJobOpportunity);

router.put("/:id", authMiddleware, requireModuleAccess("job-opportunities"), updateJobOpportunity);

router.delete("/:id", authMiddleware, adminMiddleware, deleteJobOpportunity);

module.exports = router;
