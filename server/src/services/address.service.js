const { db } = require("../db");
const { addresses } = require("../db/schema");
const { eq, and, desc } = require("drizzle-orm");

/**
 * Get all addresses for a user
 * @param {string} userId - User ID (required)
 * @returns {Array} List of user addresses
 */
async function getUserAddresses({ userId }) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const userAddresses = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, userId))
    .orderBy(desc(addresses.isDefault), addresses.createdAt);

  return userAddresses;
}

/**
 * Get a specific address by ID
 * @param {string} addressId - Address ID (required)
 * @param {string} userId - User ID (required)
 * @returns {Object|null} Address object or null if not found
 */
async function getAddressById({ addressId, userId }) {
  if (!addressId || !userId) {
    throw new Error("Address ID and User ID are required");
  }

  const [address] = await db
    .select()
    .from(addresses)
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
    .limit(1);

  return address;
}

/**
 * Create a new address
 * @param {string} userId - User ID (required)
 * @param {string} addressLine1 - Address line 1 (required)
 * @param {string} city - City (required)
 * @param {string} state - State (required)
 * @param {string} postalCode - Postal code (required)
 * @param {string} addressLine2 - Address line 2 (optional)
 * @param {string} country - Country (optional)
 * @param {boolean} isDefault - Is default address (optional)
 * @returns {Object} Created address
 */
async function createAddress({
  userId,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country,
  isDefault,
}) {
  if (!userId || !addressLine1 || !city || !state || !postalCode) {
    throw new Error(
      "User ID, address line 1, city, state, and postal code are required"
    );
  }

  // If this is set as default, unset all other default addresses
  if (isDefault) {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
  }

  const [newAddress] = await db
    .insert(addresses)
    .values({
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || false,
      updatedAt: new Date(),
    })
    .returning();

  return newAddress;
}

/**
 * Update an existing address
 * @param {string} addressId - Address ID (required)
 * @param {string} userId - User ID (required)
 * @param {string} addressLine1 - Address line 1 (optional)
 * @param {string} addressLine2 - Address line 2 (optional)
 * @param {string} city - City (optional)
 * @param {string} state - State (optional)
 * @param {string} postalCode - Postal code (optional)
 * @param {string} country - Country (optional)
 * @param {boolean} isDefault - Is default address (optional)
 * @returns {Object} Updated address
 */
async function updateAddress({
  addressId,
  userId,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country,
  isDefault,
}) {
  if (!addressId || !userId) {
    throw new Error("Address ID and User ID are required");
  }

  // Verify address exists and belongs to user
  const existingAddress = await getAddressById({ addressId, userId });
  if (!existingAddress) {
    throw new Error("Address not found");
  }

  // Build update data object with only provided fields
  const updateData = { updatedAt: new Date() };
  if (addressLine1 !== undefined) updateData.addressLine1 = addressLine1;
  if (addressLine2 !== undefined) updateData.addressLine2 = addressLine2;
  if (city !== undefined) updateData.city = city;
  if (state !== undefined) updateData.state = state;
  if (postalCode !== undefined) updateData.postalCode = postalCode;
  if (country !== undefined) updateData.country = country;
  if (isDefault !== undefined) updateData.isDefault = isDefault;

  // If this is set as default, unset all other default addresses
  if (isDefault) {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
  }

  const [updatedAddress] = await db
    .update(addresses)
    .set(updateData)
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
    .returning();

  return updatedAddress;
}

/**
 * Delete an address
 * @param {string} addressId - Address ID (required)
 * @param {string} userId - User ID (required)
 * @returns {Object|null} Deleted address or null if not found
 */
async function deleteAddress({ addressId, userId }) {
  if (!addressId || !userId) {
    throw new Error("Address ID and User ID are required");
  }

  const [deletedAddress] = await db
    .delete(addresses)
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
    .returning();

  return deletedAddress;
}

/**
 * Set an address as default
 * @param {string} addressId - Address ID (required)
 * @param {string} userId - User ID (required)
 * @returns {Object|null} Updated address or null if not found
 */
async function setDefaultAddress({ addressId, userId }) {
  if (!addressId || !userId) {
    throw new Error("Address ID and User ID are required");
  }

  // First, verify the address belongs to the user
  const address = await getAddressById({ addressId, userId });
  if (!address) {
    return null;
  }

  // Unset all other default addresses
  await db
    .update(addresses)
    .set({ isDefault: false })
    .where(eq(addresses.userId, userId));

  // Set this address as default
  const [updatedAddress] = await db
    .update(addresses)
    .set({ isDefault: true, updatedAt: new Date() })
    .where(eq(addresses.id, addressId))
    .returning();

  return updatedAddress;
}

module.exports = {
  getUserAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
