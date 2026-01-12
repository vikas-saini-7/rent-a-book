const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middlewares/error.middleware.js");
const { authenticate } = require("../middlewares/authenticate.middleware.js");
const authController = require("../controllers/auth.controller.js");

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post("/refresh", asyncHandler(authController.refresh));
router.post("/logout", asyncHandler(authController.logout));
router.get("/me", authenticate, asyncHandler(authController.me));

module.exports = router;
