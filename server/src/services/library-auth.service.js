const bcrypt = require("bcrypt");
const { db } = require("../db/index.js");
const { users, libraries } = require("../db/schema.js");
const { eq } = require("drizzle-orm");
const { AppError } = require("../middlewares/error.middleware.js");

// Helper function to generate slug from name
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.js");

exports.registerLibrary = async ({
  name,
  email,
  password,
  description,
  imageUrl,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country,
  phone,
  operatingHours,
}) => {
  // validate required fields with loop
  const requiredFields = {
    name,
    email,
    password,
    addressLine1,
    city,
    state,
    postalCode,
  };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new AppError(`${field} is required`, 400);
    }
  }

  // 1. Check if library exists
  const existingLibrary = await db
    .select()
    .from(libraries)
    .where(eq(libraries.email, email))
    .limit(1);

  if (existingLibrary.length > 0) {
    throw new AppError("Library already exists", 409);
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Generate slug from name
  let slug = generateSlug(name);

  // Check if slug already exists and make it unique if needed
  const existingSlug = await db
    .select()
    .from(libraries)
    .where(eq(libraries.slug, slug))
    .limit(1);

  if (existingSlug.length > 0) {
    // Append timestamp to make it unique
    slug = `${slug}-${Date.now()}`;
  }

  // 4. Save library
  const [library] = await db
    .insert(libraries)
    .values({
      name,
      slug,
      email,
      password: hashedPassword,
      description,
      imageUrl,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone,
      operatingHours,
    })
    .returning();

  if (!library) {
    throw new AppError("Failed to create library", 500);
  }

  // 5. Create JWT tokens
  const payload = {
    id: library.id,
    name: library.name,
    email: library.email,
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { library, accessToken, refreshToken };
};

/**
 * Login a library
 * @param {string} email - Email of library (required)
 * @param {string} password - Password of library (required)
 * @returns {Object} library details, accessToken, and refreshToken
 */
exports.loginLibrary = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // 1. Check if library exists
  const [library] = await db
    .select()
    .from(libraries)
    .where(eq(libraries.email, email))
    .limit(1);

  if (!library) {
    throw new AppError("Invalid email or password", 401);
  }

  // 2. Verify password
  const isPasswordValid = await bcrypt.compare(password, library.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  // 3. Create JWT tokens
  const payload = {
    id: library.id,
    name: library.name,
    email: library.email,
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  const { password: _, ...safeLibrary } = library;

  return { library: safeLibrary, accessToken, refreshToken };
};

/**
 * Refresh JWT tokens
 * @param {string} refreshToken - Refresh token (required)
 * @returns {Object} new accessToken and refreshToken
 */
exports.refreshLibraryToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  // 1. Verify refresh token
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (err) {
    throw new AppError("Invalid refresh token", 401);
  }

  // 2. Create new JWT tokens
  const newAccessToken = createAccessToken(payload);
  const newRefreshToken = createRefreshToken(payload);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

/**
 * Logout library (dummy function for now)
 * @returns {void}
 */
exports.logoutLibrary = async () => {
  // Invalidate tokens if stored in DB or cache (not implemented here)
  return true;
};
