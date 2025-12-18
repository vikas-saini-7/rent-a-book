const { Router } = require("express");
const router = Router();

// platform routes
const authRoutes = require("./auth.routes.js");
const profileRoutes = require("./profile.routes.js");
const bookRoutes = require("./book.routes.js");
const addressRoutes = require("./address.routes.js");

// library routes
const libraryAuthRoutes = require("./library-auth.routes.js");
const libraryAdminRoutes = require("./library-profile.routes.js");
const libraryBooksRoutes = require("./library-books.routes.js");

//////////////////
// Platform Routes
//////////////////
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/books", bookRoutes);
router.use("/addresses", addressRoutes);

//////////////////
// Library Management Routes
//////////////////
router.use("/library/auth", libraryAuthRoutes);
router.use("/library/profile", libraryAdminRoutes);
router.use("/library/books", libraryBooksRoutes);

module.exports = router;
