const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  login,
  getCurrentUser,
  changePassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);

router.get("/me", authMiddleware, getCurrentUser);

router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
