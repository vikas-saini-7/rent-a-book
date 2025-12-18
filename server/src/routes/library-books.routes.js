const { Router } = require("express");
const router = Router();
const { asyncHandler } = require("../middlewares/error.middleware.js");
const {
  authenticateLibrary,
} = require("../middlewares/authenticate.middleware.js");
const {
  createBook,
  updateBook,
  deleteBook,
  getLibraryBooks,
  addBookToLibrary,
  updateLibraryBookStock,
  removeBookFromLibrary,
} = require("../controllers/library-book.controller.js");

// All routes require library authentication
router.use(authenticateLibrary);

// Create a new book on the platform
router.post("/create", asyncHandler(createBook));

// Get all books in library inventory
router.get("/", asyncHandler(getLibraryBooks));

// Add existing book to library
router.post("/add", asyncHandler(addBookToLibrary));

// Update book details
router.put("/:bookId", asyncHandler(updateBook));

// Delete book from platform
router.delete("/:bookId", asyncHandler(deleteBook));

// Update book stock in library
router.patch("/:bookId/stock", asyncHandler(updateLibraryBookStock));

// Remove book from library inventory
router.delete("/:bookId/remove", asyncHandler(removeBookFromLibrary));

module.exports = router;
