// Centralized error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`, {
    method: req.method,
    url: req.url,
    stack: err.stack,
  });

  // Default error status and message
  let statusCode = err.status || 500;
  let message = err.message || "Internal server error";

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
};

module.exports = errorHandler;
