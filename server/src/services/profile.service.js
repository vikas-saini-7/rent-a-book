const { eq } = require("drizzle-orm");
const { db } = require("../db/index.js");
const { profiles } = require("../db/schema.js");

const getProfileById = async (id) => {
  const result = await db.select().from(profiles).where(eq(profiles.id, id));
  return result[0] || null;
};

const getProfileByEmail = async (email) => {
  const result = await db
    .select()
    .from(profiles)
    .where(eq(profiles.email, email));
  return result[0] || null;
};

const createProfile = async (profileData) => {
  const result = await db.insert(profiles).values(profileData).returning();
  return result[0];
};

const updateProfile = async (id, profileData) => {
  const result = await db
    .update(profiles)
    .set({ ...profileData, updatedAt: new Date() })
    .where(eq(profiles.id, id))
    .returning();
  return result[0] || null;
};

const deleteProfile = async (id) => {
  const result = await db
    .delete(profiles)
    .where(eq(profiles.id, id))
    .returning();
  return result[0] || null;
};

module.exports = {
  getProfileById,
  getProfileByEmail,
  createProfile,
  updateProfile,
  deleteProfile,
};
