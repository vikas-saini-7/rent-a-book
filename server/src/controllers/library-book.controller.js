const {
  createBook,
  updateBook,
  deleteBook,
  getLibraryBooks,
  addBookToLibrary,
  updateLibraryBookStock,
  removeBookFromLibrary,
} = require("../services/library-book.service.js");

/**
 * Create a new book on the platform
 * POST /api/library/books/create
 */
exports.createBook = async (req, res, next) => {
  const libraryId = req.library.id;
  const {
    title,
    authorName,
    genreName,
    isbn,
    description,
    coverImage,
    publisher,
    publishedYear,
    language,
    totalPages,
    rentalPricePerWeek,
    depositAmount,
    condition,
    totalCopies,
  } = req.body;

  const result = await createBook({
    libraryId,
    title,
    authorName,
    genreName,
    isbn,
    description,
    coverImage,
    publisher,
    publishedYear,
    language,
    totalPages,
    rentalPricePerWeek,
    depositAmount,
    condition,
    totalCopies,
  });

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: result,
  });
};

/**
 * Update book details
 * PUT /api/library/books/:bookId
 */
exports.updateBook = async (req, res, next) => {
  const libraryId = req.library.id;
  const { bookId } = req.params;
  const updateData = req.body;

  const result = await updateBook({
    libraryId,
    bookId: parseInt(bookId),
    updateData,
  });

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: result,
  });
};

/**
 * Delete a book from the platform
 * DELETE /api/library/books/:bookId
 */
exports.deleteBook = async (req, res, next) => {
  const libraryId = req.library.id;
  const { bookId } = req.params;

  await deleteBook({
    libraryId,
    bookId: parseInt(bookId),
  });

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
};

/**
 * Get all books in library's inventory
 * GET /api/library/books
 */
exports.getLibraryBooks = async (req, res, next) => {
  const libraryId = req.library.id;
  const { page = 1, limit = 20, search } = req.query;

  const result = await getLibraryBooks({
    libraryId,
    page: parseInt(page),
    limit: parseInt(limit),
    search,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
};

/**
 * Add existing book to library inventory
 * POST /api/library/books/add
 */
exports.addBookToLibrary = async (req, res, next) => {
  const libraryId = req.library.id;
  const { bookId, totalCopies } = req.body;

  const result = await addBookToLibrary({
    libraryId,
    bookId: parseInt(bookId),
    totalCopies: parseInt(totalCopies) || 1,
  });

  res.status(201).json({
    success: true,
    message: "Book added to library inventory",
    data: result,
  });
};

/**
 * Update library book stock
 * PATCH /api/library/books/:bookId/stock
 */
exports.updateLibraryBookStock = async (req, res, next) => {
  const libraryId = req.library.id;
  const { bookId } = req.params;
  const { totalCopies, availableCopies } = req.body;

  const result = await updateLibraryBookStock({
    libraryId,
    bookId: parseInt(bookId),
    totalCopies: totalCopies ? parseInt(totalCopies) : undefined,
    availableCopies: availableCopies ? parseInt(availableCopies) : undefined,
  });

  res.status(200).json({
    success: true,
    message: "Book stock updated successfully",
    data: result,
  });
};

/**
 * Remove book from library inventory
 * DELETE /api/library/books/:bookId/remove
 */
exports.removeBookFromLibrary = async (req, res, next) => {
  const libraryId = req.library.id;
  const { bookId } = req.params;

  await removeBookFromLibrary({
    libraryId,
    bookId: parseInt(bookId),
  });

  res.status(200).json({
    success: true,
    message: "Book removed from library inventory",
  });
};
