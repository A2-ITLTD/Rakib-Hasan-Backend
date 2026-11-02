const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
} = require("../controllers/serviceCategoriesController");

const router = express.Router();

router.get("/", getServiceCategories);
router.post(
  "/",
  authMiddleware,
  requireModuleAccess("services"),
  createServiceCategory,
);
router.put(
  "/:name",
  authMiddleware,
  requireModuleAccess("services"),
  updateServiceCategory,
);
router.delete("/:name", authMiddleware, adminMiddleware, deleteServiceCategory);

module.exports = router;
