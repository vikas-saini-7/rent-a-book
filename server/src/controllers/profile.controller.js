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
  const { id: userId } = req.user;

  const profile = await getProfileByIdService({ userId });

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
  const { id: userId } = req.user;
  const { fullName, phone, avatarUrl } = req.body;

  const updatedProfile = await updateProfileService({
    userId,
    fullName,
    phone,
    avatarUrl,
  });

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
  const { id: userId } = req.user;

  await deleteProfileService({ userId });

  // Clear cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
};
