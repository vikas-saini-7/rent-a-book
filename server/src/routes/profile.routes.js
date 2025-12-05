const { Router } = require("express");
const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controller.js");

const router = Router();

// GET /api/profile/:id - Get profile by ID
router.get("/:id", getProfile);

// POST /api/profile - Create a new profile
router.post("/", createProfile);

// PUT /api/profile/:id - Update profile
router.put("/:id", updateProfile);

// DELETE /api/profile/:id - Delete profile
router.delete("/:id", deleteProfile);

module.exports = router;
