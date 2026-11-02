const express = require("express");
const {
  authMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const { getCSR, getAdminCSR, updateCSR } = require("../controllers/csrController");

const router = express.Router();

router.get("/", getCSR);

router.get("/admin", authMiddleware, requireModuleAccess("csr"), getAdminCSR);

router.put("/", authMiddleware, requireModuleAccess("csr"), updateCSR);

module.exports = router;
