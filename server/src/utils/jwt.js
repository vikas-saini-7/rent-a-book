const jwt = require("jsonwebtoken");
const { AppError } = require("../middlewares/error.middleware.js");

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your-access-token-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your-refresh-token-secret";
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

/**
 * Create an access token
 * @param {Object} payload - User data to encode in token
 * @returns {string} - Signed JWT token
 */
exports.createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

/**
 * Create a refresh token
 * @param {Object} payload - User data to encode in token
 * @returns {string} - Signed JWT token
 */
exports.createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

/**
 * Verify an access token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded payload
 * @throws {AppError} - If token is invalid or expired
 */
exports.verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Access token expired", 401);
    }
    throw new AppError("Invalid access token", 401);
  }
};

/**
 * Verify a refresh token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded payload
 * @throws {AppError} - If token is invalid or expired
 */
exports.verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Refresh token expired", 401);
    }
    throw new AppError("Invalid refresh token", 401);
  }
};
