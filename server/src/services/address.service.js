const { db } = require("../db");
const { addresses } = require("../db/schema");
const { eq, and, desc } = require("drizzle-orm");

/**
 * Get all addresses for a user
 */
async function getUserAddresses(userId) {
  const userAddresses = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, userId))
    .orderBy(desc(addresses.isDefault), addresses.createdAt);

  return userAddresses;
}

/**
 * Get a specific address by ID
 */
async function getAddressById(addressId, userId) {
  const [address] = await db
    .select()
    .from(addresses)
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
    .limit(1);

  return address;
}

/**
 * Create a new address
 */
async function createAddress(userId, addressData) {
  // If this is set as default, unset all other default addresses
  if (addressData.isDefault) {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
  }

  const [newAddress] = await db
    .insert(addresses)
    .values({
      userId,
      ...addressData,
      updatedAt: new Date(),
    })
    .returning();

  return newAddress;
}

/**
 * Update an existing address
 */
async function updateAddress(addressId, userId, addressData) {
  // If this is set as default, unset all other default addresses
  if (addressData.isDefault) {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
  }

  const [updatedAddress] = await db
    .update(addresses)
    .set({
      ...addressData,
      updatedAt: new Date(),
    })
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
    .returning();

  return updatedAddress;
}

/**
 * Delete an address
 */
async function deleteAddress(addressId, userId) {
  const [deletedAddress] = await db
    .delete(addresses)
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
    .returning();

  return deletedAddress;
}

/**
 * Set an address as default
 */
async function setDefaultAddress(addressId, userId) {
  // First, verify the address belongs to the user
  const address = await getAddressById(addressId, userId);
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
