/**
 * BOOK CONTROLLER
 *
 * API Endpoints:
 *
 * GET /api/books
 * Get all books with advanced filtering, searching, and sorting
 * Query Parameters:
 *   - search: string (searches in title, author, ISBN)
 *   - location: string (city name)
 *   - pincode: string (postal code)
 *   - city: string (city name)
 *   - sortBy: string (relevance|available_now|free_delivery|top_rated|new_arrivals|price_low|price_high)
 *   - minPrice: number (minimum rental price per week)
 *   - maxPrice: number (maximum rental price per week)
 *   - genre: string (comma-separated genre names or slugs)
 *   - language: string (comma-separated languages, e.g., "English,Hindi")
 *   - condition: string (comma-separated conditions, e.g., "like_new,good")
 *   - rentalPeriod: string (comma-separated periods, e.g., "1_week,2_weeks")
 *   - availableNow: boolean (true to show only available books)
 *   - page: number (default: 1)
 *   - limit: number (default: 12)
 *
 * Example: GET /api/books?search=harry&sortBy=top_rated&genre=fiction&minPrice=10&maxPrice=50&page=1&limit=12
 *
 * GET /api/books/featured
 * Get featured books
 * Query Parameters:
 *   - limit: number (default: 12)
 *   - location: string
 *   - pincode: string
 *
 * GET /api/books/most-rented
 * Get most rented books
 * Query Parameters:
 *   - limit: number (default: 12)
 *   - location: string
 *   - pincode: string
 *
 * GET /api/books/genre/:slug
 * Get books by genre
 * Query Parameters:
 *   - page: number (default: 1)
 *   - limit: number (default: 12)
 *   - sortBy: string
 *   - location: string
 *   - pincode: string
 *
 * GET /api/books/:id
 * Get single book details
 * Query Parameters:
 *   - location: string
 *   - pincode: string
 *
 * GET /api/filters
 * Get all available filter options (genres, languages, conditions, price range)
 *
 * GET /api/genres
 * Get all genres with book counts
 */

const {
  getAllBooksService,
  getBookByIdService,
  getFeaturedBooksService,
  getMostRentedBooksService,
  getBooksByGenreService,
} = require("../services/book.service.js");

/**
 * Get all books with filters, search, sorting, and pagination
 */
exports.getAllBooks = async (req, res, next) => {
  try {
    const {
      // Search
      search,
      // Location filters
      location,
      pincode,
      city,
      // Sorting
      sortBy = "relevance", // relevance, available_now, free_delivery, top_rated, new_arrivals, price_low, price_high
      // Price filter
      minPrice,
      maxPrice,
      // Genre filter (can be multiple, comma-separated)
      genre,
      // Language filter (can be multiple, comma-separated)
      language,
      // Condition filter (can be multiple, comma-separated)
      condition,
      // Rental period filter (can be multiple, comma-separated)
      rentalPeriod,
      // Availability
      availableNow,
      // Pagination
      page = 1,
      limit = 12,
    } = req.query;

    const filters = {
      search,
      location,
      pincode,
      city,
      sortBy,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      genre: genre ? genre.split(",") : undefined,
      language: language ? language.split(",") : undefined,
      condition: condition ? condition.split(",") : undefined,
      rentalPeriod: rentalPeriod ? rentalPeriod.split(",") : undefined,
      availableNow: availableNow === "true",
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const result = await getAllBooksService(filters);

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single book by ID with detailed information
 */
exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { location, pincode } = req.query;

    const book = await getBookByIdService(id, { location, pincode });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get featured books
 */
exports.getFeaturedBooks = async (req, res, next) => {
  try {
    const { limit = 12, location, pincode } = req.query;

    const books = await getFeaturedBooksService({
      limit: parseInt(limit),
      location,
      pincode,
    });

    res.status(200).json({
      success: true,
      message: "Featured books fetched successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get most rented books
 */
exports.getMostRentedBooks = async (req, res, next) => {
  try {
    const { limit = 12, location, pincode } = req.query;

    const books = await getMostRentedBooksService({
      limit: parseInt(limit),
      location,
      pincode,
    });

    res.status(200).json({
      success: true,
      message: "Most rented books fetched successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get books by genre
 */
exports.getBooksByGenre = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 12, sortBy, location, pincode } = req.query;

    const result = await getBooksByGenreService(slug, {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      location,
      pincode,
    });

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
