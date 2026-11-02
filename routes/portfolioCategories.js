const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getPortfolioCategories,
  createPortfolioCategory,
  deletePortfolioCategory,
} = require("../controllers/portfolioCategoriesController");

const router = express.Router();

router.get("/", getPortfolioCategories);
router.post(
  "/",
  authMiddleware,
  requireModuleAccess("portfolio"),
  createPortfolioCategory,
);
router.delete(
  "/:name",
  authMiddleware,
  adminMiddleware,
  deletePortfolioCategory,
);

module.exports = router;
