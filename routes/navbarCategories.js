const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getNavbarCategories,
  createNavbarCategory,
  updateNavbarCategory,
  deleteNavbarCategory,
} = require("../controllers/navbarCategoriesController");

const router = express.Router();

router.get("/", getNavbarCategories);
router.post("/", authMiddleware, requireModuleAccess("navbar-menu"), createNavbarCategory);
router.put(
  "/:name",
  authMiddleware,
  requireModuleAccess("navbar-menu"),
  updateNavbarCategory,
);
router.delete("/:name", authMiddleware, adminMiddleware, deleteNavbarCategory);

module.exports = router;
