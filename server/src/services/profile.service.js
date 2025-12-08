const { eq } = require("drizzle-orm");
const { db } = require("../db/index.js");
const { users } = require("../db/schema.js");
const { AppError } = require("../middlewares/error.middleware.js");

/**
 * Get user profile by ID (excludes password)
 * @param {string} userId - User ID
 * @returns {Object} User profile without password
 * @throws {AppError} If user not found
 */
const getProfileByIdService = async (userId) => {
  const result = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
      avatarUrl: users.avatarUrl,
      depositBalance: users.depositBalance,
      lockedBalance: users.lockedBalance,
      isPremium: users.isPremium,
      isVerified: users.isVerified,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!result.length) {
    throw new AppError("User not found", 404);
  }

  return result[0];
};

/**
 * Update user profile (excludes sensitive fields like password, role, balances)
 * @param {string} userId - User ID
 * @param {Object} profileData - Profile data to update
 * @returns {Object} Updated user profile without password
 * @throws {AppError} If user not found or validation fails
 */
const updateProfileService = async (userId, profileData) => {
  // Define allowed fields to update (map from client field names to DB field names)
  const allowedFields = {
    fullName: "fullName",
    phone: "phone",
    avatarUrl: "avatarUrl",
  };

  // Filter out non-allowed fields and map to DB field names
  const updateData = {};
  for (const [clientField, dbField] of Object.entries(allowedFields)) {
    if (profileData[clientField] !== undefined) {
      updateData[dbField] = profileData[clientField];
    }
  }

  // Validate at least one field to update
  if (Object.keys(updateData).length === 0) {
    throw new AppError("No valid fields to update", 400);
  }

  // Add updatedAt timestamp
  updateData.updatedAt = new Date();

  // Update user
  const result = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
      avatarUrl: users.avatarUrl,
      depositBalance: users.depositBalance,
      lockedBalance: users.lockedBalance,
      isPremium: users.isPremium,
      isVerified: users.isVerified,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  if (!result.length) {
    throw new AppError("User not found", 404);
  }

  return result[0];
};

/**
 * Delete user account
 * @param {string} userId - User ID
 * @returns {Object} Deleted user info
 * @throws {AppError} If user not found
 */
const deleteProfileService = async (userId) => {
  const result = await db.delete(users).where(eq(users.id, userId)).returning({
    id: users.id,
    email: users.email,
  });

  if (!result.length) {
    throw new AppError("User not found", 404);
  }

  return result[0];
};

module.exports = {
  getProfileByIdService,
  updateProfileService,
  deleteProfileService,
};
