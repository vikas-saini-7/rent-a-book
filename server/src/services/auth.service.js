const bcrypt = require("bcrypt");
const { db } = require("../db/index.js");
const { users } = require("../db/schema.js");
const { eq } = require("drizzle-orm");
const { AppError } = require("../middlewares/error.middleware.js");

const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.js");

/**
 * Register a new user
 * @param {string} name - Name of user (required)
 * @param {string} email - Email of user (required)
 * @param {string} password - Password of user (required)
 * @returns {Object} user details, accessToken, and refreshToken
 */
exports.registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required", 400);
  }

  // 1. Check if user exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new AppError("User already exists", 409);
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Save user
  const [user] = await db
    .insert(users)
    .values({
      fullName: name,
      email,
      password: hashedPassword,
    })
    .returning();

  if (!user) {
    throw new AppError("Failed to create user", 500);
  }

  // 4. Create JWT tokens
  const payload = {
    id: user.id,
    name: user.fullName,
    email: user.email,
    avatar: user.avatarUrl,
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { user, accessToken, refreshToken };
};

/**
 * Login a user
 * @param {string} email - Email of user (required)
 * @param {string} password - Password of user (required)
 * @returns {Object} user details, accessToken, and refreshToken
 */
exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // 1. Check if user exists
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  // 3. Create JWT tokens
  const payload = {
    id: user.id,
    name: user.fullName,
    email: user.email,
    avatar: user.avatarUrl,
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { user, accessToken, refreshToken };
};

/**
 * Refresh access token
 * @param {string} refreshToken - Refresh token (required)
 * @returns {Object} new accessToken
 */
exports.refreshAccessToken = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  const decoded = verifyRefreshToken(refreshToken);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, decoded.id))
    .limit(1);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const payload = {
    id: user.id,
    name: user.fullName,
    email: user.email,
    avatar: user.avatarUrl,
  };

  const accessToken = createAccessToken(payload);

  return { accessToken };
};

/**
 * Logout user
 * @returns {boolean} success status
 */
exports.logoutUser = () => {
  // No DB changes required
  return true;
};
