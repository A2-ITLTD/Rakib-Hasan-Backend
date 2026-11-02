const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getServices,
  getAdminServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/servicesController");

const router = express.Router();

router.get("/", getServices);

router.get("/admin/all", authMiddleware, requireModuleAccess("services"), getAdminServices);

router.post("/", authMiddleware, requireModuleAccess("services"), createService);

router.put("/:id", authMiddleware, requireModuleAccess("services"), updateService);

router.delete("/:id", authMiddleware, adminMiddleware, deleteService);

module.exports = router;
