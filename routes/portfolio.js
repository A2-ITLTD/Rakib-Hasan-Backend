const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getPortfolios,
  getAdminPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const router = express.Router();

router.get("/", getPortfolios);

router.get("/admin/all", authMiddleware, requireModuleAccess("portfolio"), getAdminPortfolios);

router.post("/", authMiddleware, requireModuleAccess("portfolio"), createPortfolio);

router.put("/:id", authMiddleware, requireModuleAccess("portfolio"), updatePortfolio);

router.delete("/:id", authMiddleware, adminMiddleware, deletePortfolio);

module.exports = router;
