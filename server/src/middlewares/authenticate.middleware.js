const { verifyAccessToken } = require("../utils/jwt.js");
const { AppError } = require("./error.middleware.js");

/**
 * Authentication middleware to verify JWT token and attach user to request
 * Checks cookies first, then falls back to Authorization header
 */
const authenticate = (req, res, next) => {
  try {
    let token = null;

    // Prioritize cookie-based authentication
    if (req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }
    // Fallback to Authorization header for backward compatibility
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.substring(7);
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
    let token = null;

    // Prioritize cookie-based authentication
    if (req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }
    // Fallback to Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.substring(7);
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

const authenticateLibrary = (req, res, next) => {
  try {
    let token = null;

    // Prioritize cookie-based authentication
    if (req.cookies.libraryAccessToken) {
      token = req.cookies.libraryAccessToken;
    }
    // Fallback to Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.substring(7);
    }

    // If no token found
    if (!token) {
      throw new AppError("Library authentication required", 401);
    }

    // Verify token
    const decoded = verifyAccessToken(token);
    // Attach library info to request
    req.library = {
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

module.exports = {
  authenticate,
  optionalAuthenticate,
  authenticateLibrary,
};
