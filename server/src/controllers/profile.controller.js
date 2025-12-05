const profileService = require("../services/profile.service.js");

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await profileService.getProfileById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const newProfile = await profileService.createProfile(profileData);

    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profileData = req.body;
    const updatedProfile = await profileService.updateProfile(id, profileData);

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await profileService.deleteProfile(id);

    if (!deleted) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
