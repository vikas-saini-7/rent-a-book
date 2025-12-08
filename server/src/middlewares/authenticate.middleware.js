const { verifyAccessToken } = require("../utils/jwt.js");
const { AppError } = require("./error.middleware.js");

/**
 * Authentication middleware to verify JWT token and attach user to request
 * Checks both Authorization header (Bearer token) and cookies
 */
const authenticate = (req, res, next) => {
  try {
    // Try to get token from Authorization header first
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // If not in header, try cookies
    if (!token && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    // If no token found
    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Attach user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    // Pass the error to the error handler
    next(error);
  }
};

/**
 * Optional authentication middleware
 * Attaches user if token exists, but doesn't throw error if not
 */
const optionalAuthenticate = (req, res, next) => {
  try {
    // Try to get token from Authorization header first
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // If not in header, try cookies
    if (!token && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    // If token exists, verify and attach user
    if (token) {
      const decoded = verifyAccessToken(token);
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    }

    next();
  } catch (error) {
    // For optional auth, continue without user
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuthenticate,
};
