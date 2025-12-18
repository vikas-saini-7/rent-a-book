const express = require("express");
const router = express.Router();

const libraryAuthController = require("../controllers/library-auth.controller.js");
const { asyncHandler } = require("../middlewares/error.middleware.js");

router.post("/register", asyncHandler(libraryAuthController.register));
router.post("/login", asyncHandler(libraryAuthController.login));
router.post("/refresh", asyncHandler(libraryAuthController.refresh));
router.post("/logout", asyncHandler(libraryAuthController.logout));

module.exports = router;
