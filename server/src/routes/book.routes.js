const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller.js");
const filterController = require("../controllers/filter.controller.js");

// FILTER ROUTES
router.get("/filters-options", filterController.getFilterOptions);
router.get("/genres-list", filterController.getAllGenres);

// WEB ROUTES

// Route to get all books with filters, search, sorting
router.get("/", bookController.getAllBooks);

// Route to get featured books
router.get("/featured", bookController.getFeaturedBooks);

// Route to get most rented books
router.get("/most-rented", bookController.getMostRentedBooks);

// Route to get books by genre
router.get("/genre/:slug", bookController.getBooksByGenre);

// Route to get a single book by SLUG (must be before /:id route)
router.get("/:slug", bookController.getBookBySlug);

// LIBRARY ROUTES

module.exports = router;
