const express = require("express");
const router = express.Router();

const libraryAuthController = require("../controllers/library-auth.controller.js");
const { asyncHandler } = require("../middlewares/error.middleware.js");
const {
  authenticateLibrary,
} = require("../middlewares/authenticate.middleware.js");

router.post("/register", asyncHandler(libraryAuthController.register));
router.post("/login", asyncHandler(libraryAuthController.login));
router.post("/refresh", asyncHandler(libraryAuthController.refresh));
router.post("/logout", asyncHandler(libraryAuthController.logout));
router.get("/me", authenticateLibrary, asyncHandler(libraryAuthController.me));

module.exports = router;
