const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getClientLogos,
  getAdminClientLogos,
  createClientLogo,
  updateClientLogo,
  deleteClientLogo,
} = require("../controllers/clientLogosController");

const router = express.Router();

router.get("/", getClientLogos);

router.get("/admin/all", authMiddleware, requireModuleAccess("client-showcase"), getAdminClientLogos);

router.post("/", authMiddleware, requireModuleAccess("client-showcase"), createClientLogo);

router.put("/:id", authMiddleware, requireModuleAccess("client-showcase"), updateClientLogo);

router.delete("/:id", authMiddleware, adminMiddleware, deleteClientLogo);

module.exports = router;
