const { Router } = require("express");
const authRoutes = require("./auth.routes.js");
const profileRoutes = require("./profile.routes.js");
const bookRoutes = require("./book.routes.js");

const router = Router();

// Mount all routes
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/books", bookRoutes);

// Add more routes here as needed
// router.use("/rentals", rentalRoutes);

module.exports = router;
