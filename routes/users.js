const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);

router.post("/create", authMiddleware, adminMiddleware, createUser);

router.put("/:id", authMiddleware, adminMiddleware, updateUser);

router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
