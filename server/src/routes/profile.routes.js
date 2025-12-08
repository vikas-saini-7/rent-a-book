const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middlewares/error.middleware.js");
const { authenticate } = require("../middlewares/authenticate.middleware.js");
const profileController = require("../controllers/profile.controller.js");

// All profile routes require authentication
router.use(authenticate);

// GET /api/profile - Get current user's profile
router.get("/", asyncHandler(profileController.getProfile));

// PUT /api/profile - Update current user's profile
router.put("/", asyncHandler(profileController.updateProfile));

// DELETE /api/profile - Delete current user's account
router.delete("/", asyncHandler(profileController.deleteProfile));

module.exports = router;
