const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middlewares/error.middleware.js");
const { authenticateLibrary } = require("../middlewares/authenticate.middleware.js");
const libraryProfileController = require("../controllers/library-profile.controller.js");

// All library profile routes require library authentication
router.use(authenticateLibrary);