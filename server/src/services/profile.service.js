const { eq } = require("drizzle-orm");
const { db } = require("../db/index.js");
const { users } = require("../db/schema.js");

const getProfileById = async (id) => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0] || null;
};

const getProfileByEmail = async (email) => {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] || null;
};

const createProfile = async (profileData) => {
  const result = await db.insert(users).values(profileData).returning();
  return result[0];
};

const updateProfile = async (id, profileData) => {
  const result = await db
    .update(users)
    .set({ ...profileData, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
  return result[0] || null;
};

const deleteProfile = async (id) => {
  const result = await db.delete(users).where(eq(users.id, id)).returning();
  return result[0] || null;
};

module.exports = {
  getProfileById,
  getProfileByEmail,
  createProfile,
  updateProfile,
  deleteProfile,
};
