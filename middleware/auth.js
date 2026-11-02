const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token is not valid",
      error: error.message,
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};

const requireAdminOrModerator = (req, res, next) => {
  if (req.role === "admin" || req.role === "moderator") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied. Admin or Moderator privileges required.",
  });
};

const requireModuleAccess = (moduleKey) => async (req, res, next) => {
  try {
    if (req.role === "admin") {
      return next();
    }

    if (req.role === "moderator") {
      const user = await User.findById(req.userId).select(
        "permissions isActive",
      );
      if (user?.isActive && user.permissions?.includes(moduleKey)) {
        return next();
      }
    }

    return res.status(403).json({
      success: false,
      message: "Access denied for this module.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to verify module access",
      error: error.message,
    });
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  requireAdminOrModerator,
  requireModuleAccess,
};
