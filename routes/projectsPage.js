const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getProjectsPage,
  getAdminProjectsPage,
  updateProjectsPage,
} = require("../controllers/projectsPageController");

const router = express.Router();

router.get("/", getProjectsPage);

router.get("/admin", authMiddleware, requireModuleAccess("projects-page"), getAdminProjectsPage);

router.put("/", authMiddleware, requireModuleAccess("projects-page"), updateProjectsPage);

module.exports = router;
