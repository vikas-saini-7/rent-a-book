const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middlewares/error.middleware.js");
const { authenticate } = require("../middlewares/authenticate.middleware.js");
const profileController = require("../controllers/profile.controller.js");

// All profile routes require authentication
router.use(authenticate);

router.get("/", asyncHandler(profileController.getProfile));

router.put("/", asyncHandler(profileController.updateProfile));

router.delete("/", asyncHandler(profileController.deleteProfile));

module.exports = router;
