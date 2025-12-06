/**
 * Custom error class for operational errors
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Async handler wrapper to catch errors in async route handlers
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  if (process.env.NODE_ENV === "development") {
    console.error("\n🔴 Error Details:");
    console.error("Message:", err.message);
    console.error("Status:", err.statusCode);
    console.error("Stack:", err.stack);
  } else {
    console.error("Error:", err.message);
  }

  // Operational errors (AppError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  // Validation errors (from express-validator if you add it later)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors,
    });
  }

  // Database errors
  if (err.code === "23505") {
    // Unique constraint violation
    return res.status(409).json({
      success: false,
      message: "Duplicate entry found",
    });
  }

  if (err.code === "23503") {
    // Foreign key violation
    return res.status(400).json({
      success: false,
      message: "Related record not found",
    });
  }

  // Programming or unknown errors - don't leak details
  console.error("💥 UNHANDLED ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
    ...(process.env.NODE_ENV === "development" && {
      error: err.message,
      stack: err.stack,
    }),
  });
};

/**
 * Not found middleware for undefined routes
 */
const notFound = (req, res, next) => {
  const error = new AppError(`Route not found - ${req.originalUrl}`, 404);
  next(error);
};

module.exports = { AppError, asyncHandler, errorHandler, notFound };
