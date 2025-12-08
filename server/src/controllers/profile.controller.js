const {
  getProfileByIdService,
  updateProfileService,
  deleteProfileService,
} = require("../services/profile.service.js");

/**
 * Get current user's profile
 * GET /api/profile
 */
exports.getProfile = async (req, res) => {
  // User ID comes from authenticate middleware (req.user.id)
  const profile = await getProfileByIdService(req.user.id);

  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: profile,
  });
};

/**
 * Update current user's profile
 * PUT /api/profile
 */
exports.updateProfile = async (req, res) => {
  // User ID comes from authenticate middleware (req.user.id)
  const profileData = req.body;

  const updatedProfile = await updateProfileService(req.user.id, profileData);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedProfile,
  });
};

/**
 * Delete current user's account
 * DELETE /api/profile
 */
exports.deleteProfile = async (req, res) => {
  // User ID comes from authenticate middleware (req.user.id)
  await deleteProfileService(req.user.id);

  // Clear cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
};
