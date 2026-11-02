const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireAdminOrModerator,
} = require("../middleware/auth");
const {
  getRoles,
  createRole,
  deleteRole,
} = require("../controllers/rolesController");

const router = express.Router();

router.get("/", getRoles);
router.post("/", authMiddleware, requireAdminOrModerator, createRole);
router.delete("/:name", authMiddleware, adminMiddleware, deleteRole);

module.exports = router;
