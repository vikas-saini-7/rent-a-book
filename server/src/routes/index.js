const { Router } = require("express");
const profileRoutes = require("./profile.routes.js");

const router = Router();

// Mount all routes
router.use("/profile", profileRoutes);

// Add more routes here as needed
// router.use("/books", bookRoutes);
// router.use("/rentals", rentalRoutes);

module.exports = router;
