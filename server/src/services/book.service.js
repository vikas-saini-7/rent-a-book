const { db } = require("../db/index.js");
const {
  books,
  authors,
  genres,
  libraryBooks,
  libraries,
} = require("../db/schema.js");
const {
  eq,
  and,
  or,
  sql,
  ilike,
  gte,
  lte,
  desc,
  asc,
  inArray,
} = require("drizzle-orm");

/**
 * Get all books with advanced filters, search, and sorting
 */
exports.getAllBooksService = async (filters) => {
  const {
    search,
    location,
    pincode,
    city,
    sortBy,
    minPrice,
    maxPrice,
    genre,
    language,
    condition,
    rentalPeriod,
    availableNow,
    page,
    limit,
  } = filters;

  // Calculate offset for pagination
  const offset = (page - 1) * limit;

  // Build WHERE conditions
  const conditions = [];

  // Search condition (title, author, ISBN)
  if (search) {
    conditions.push(
      or(ilike(books.title, `%${search}%`), ilike(books.isbn, `%${search}%`))
    );
  }

  // Price range filter
  if (minPrice !== undefined) {
    conditions.push(gte(books.rentalPricePerWeek, minPrice.toString()));
  }
  if (maxPrice !== undefined) {
    conditions.push(lte(books.rentalPricePerWeek, maxPrice.toString()));
  }

  // Language filter
  if (language && language.length > 0) {
    conditions.push(inArray(books.language, language));
  }

  // Condition filter
  if (condition && condition.length > 0) {
    // Convert UI values to DB enum values
    const conditionMap = {
      like_new: "like_new",
      "Like New": "like_new",
      good: "good",
      Good: "good",
      fair: "fair",
      Fair: "fair",
    };
    const dbConditions = condition.map(
      (c) => conditionMap[c] || c.toLowerCase().replace(" ", "_")
    );
    conditions.push(inArray(books.condition, dbConditions));
  }

  // Base query with joins
  let query = db
    .select({
      id: books.id,
      title: books.title,
      slug: books.slug,
      isbn: books.isbn,
      description: books.description,
      coverImage: books.coverImage,
      publisher: books.publisher,
      publishedYear: books.publishedYear,
      language: books.language,
      totalPages: books.totalPages,
      rentalPricePerWeek: books.rentalPricePerWeek,
      depositAmount: books.depositAmount,
      condition: books.condition,
      isFeatured: books.isFeatured,
      averageRating: books.averageRating,
      totalRatings: books.totalRatings,
      totalRentals: books.totalRentals,
      createdAt: books.createdAt,
      author: {
        id: authors.id,
        name: authors.name,
        imageUrl: authors.imageUrl,
      },
      genre: {
        id: genres.id,
        name: genres.name,
        slug: genres.slug,
      },
      // Aggregate library info
      totalCopies: sql`COALESCE(SUM(${libraryBooks.totalCopies}), 0)`.as(
        "total_copies"
      ),
      availableCopies:
        sql`COALESCE(SUM(${libraryBooks.availableCopies}), 0)`.as(
          "available_copies"
        ),
      librariesCount: sql`COUNT(DISTINCT ${libraryBooks.libraryId})`.as(
        "libraries_count"
      ),
    })
    .from(books)
    .leftJoin(authors, eq(books.authorId, authors.id))
    .leftJoin(genres, eq(books.genreId, genres.id))
    .leftJoin(libraryBooks, eq(books.id, libraryBooks.bookId));

  // Add location-based filtering if provided
  if (location || pincode || city) {
    query = query.leftJoin(libraries, eq(libraryBooks.libraryId, libraries.id));

    if (pincode) {
      conditions.push(eq(libraries.postalCode, pincode));
    } else if (city) {
      conditions.push(ilike(libraries.city, `%${city}%`));
    }
  }

  // Add genre filter
  if (genre && genre.length > 0) {
    // Genre can be passed as names or slugs
    conditions.push(
      or(inArray(genres.name, genre), inArray(genres.slug, genre))
    );
  }

  // Apply all conditions
  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  // Group by book and related fields
  query = query.groupBy(books.id, authors.id, genres.id);

  // Add availability filter after grouping
  if (availableNow) {
    query = query.having(sql`SUM(${libraryBooks.availableCopies}) > 0`);
  }

  // Apply sorting
  switch (sortBy) {
    case "available_now":
      query = query.orderBy(desc(sql`SUM(${libraryBooks.availableCopies})`));
      break;
    case "top_rated":
      query = query.orderBy(desc(books.averageRating));
      break;
    case "new_arrivals":
      query = query.orderBy(desc(books.createdAt));
      break;
    case "price_low":
      query = query.orderBy(asc(books.rentalPricePerWeek));
      break;
    case "price_high":
      query = query.orderBy(desc(books.rentalPricePerWeek));
      break;
    case "most_rented":
      query = query.orderBy(desc(books.totalRentals));
      break;
    case "relevance":
    default:
      // If search is provided, order by relevance (can be enhanced with full-text search)
      if (search) {
        query = query.orderBy(desc(books.totalRentals));
      } else {
        query = query.orderBy(
          desc(books.isFeatured),
          desc(books.averageRating)
        );
      }
      break;
  }

  // Get total count for pagination
  const countQuery = db
    .select({ count: sql`COUNT(DISTINCT ${books.id})` })
    .from(books)
    .leftJoin(authors, eq(books.authorId, authors.id))
    .leftJoin(genres, eq(books.genreId, genres.id))
    .leftJoin(libraryBooks, eq(books.id, libraryBooks.bookId));

  if (location || pincode || city) {
    countQuery.leftJoin(libraries, eq(libraryBooks.libraryId, libraries.id));
  }

  if (conditions.length > 0) {
    countQuery.where(and(...conditions));
  }

  const [{ count }] = await countQuery;
  const totalBooks = parseInt(count);

  // Apply pagination
  query = query.limit(limit).offset(offset);

  // Execute query
  const booksData = await query;

  return {
    books: booksData,
    pagination: {
      page,
      limit,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      hasMore: page * limit < totalBooks,
    },
  };
};

/**
 * Get a single book by ID with detailed information
 */
exports.getBookByIdService = async (bookId, options = {}) => {
  const { location, pincode } = options;

  const conditions = [eq(books.id, parseInt(bookId))];

  let query = db
    .select({
      id: books.id,
      title: books.title,
      slug: books.slug,
      isbn: books.isbn,
      description: books.description,
      coverImage: books.coverImage,
      publisher: books.publisher,
      publishedYear: books.publishedYear,
      language: books.language,
      totalPages: books.totalPages,
      rentalPricePerWeek: books.rentalPricePerWeek,
      depositAmount: books.depositAmount,
      condition: books.condition,
      isFeatured: books.isFeatured,
      averageRating: books.averageRating,
      totalRatings: books.totalRatings,
      totalRentals: books.totalRentals,
      createdAt: books.createdAt,
      author: {
        id: authors.id,
        name: authors.name,
        bio: authors.bio,
        imageUrl: authors.imageUrl,
      },
      genre: {
        id: genres.id,
        name: genres.name,
        slug: genres.slug,
      },
    })
    .from(books)
    .leftJoin(authors, eq(books.authorId, authors.id))
    .leftJoin(genres, eq(books.genreId, genres.id))
    .where(and(...conditions));

  const [book] = await query;

  if (!book) {
    return null;
  }

  // Get availability from libraries
  let librariesQuery = db
    .select({
      libraryId: libraries.id,
      libraryName: libraries.name,
      librarySlug: libraries.slug,
      city: libraries.city,
      state: libraries.state,
      postalCode: libraries.postalCode,
      totalCopies: libraryBooks.totalCopies,
      availableCopies: libraryBooks.availableCopies,
      isAvailable: libraryBooks.isAvailable,
    })
    .from(libraryBooks)
    .innerJoin(libraries, eq(libraryBooks.libraryId, libraries.id))
    .where(eq(libraryBooks.bookId, parseInt(bookId)));

  // Filter by location if provided
  if (pincode) {
    librariesQuery = librariesQuery.where(eq(libraries.postalCode, pincode));
  } else if (location) {
    librariesQuery = librariesQuery.where(
      ilike(libraries.city, `%${location}%`)
    );
  }

  const availableLibraries = await librariesQuery;

  return {
    ...book,
    availableAt: availableLibraries,
    totalAvailableCopies: availableLibraries.reduce(
      (sum, lib) => sum + (lib.availableCopies || 0),
      0
    ),
  };
};

/**
 * Get a single book by SLUG with detailed information including libraries
 */
exports.getBookBySlugService = async (bookSlug, options = {}) => {
  const { location, pincode } = options;

  let query = db
    .select({
      id: books.id,
      title: books.title,
      slug: books.slug,
      isbn: books.isbn,
      description: books.description,
      coverImage: books.coverImage,
      publisher: books.publisher,
      publishedYear: books.publishedYear,
      language: books.language,
      totalPages: books.totalPages,
      rentalPricePerWeek: books.rentalPricePerWeek,
      depositAmount: books.depositAmount,
      condition: books.condition,
      isFeatured: books.isFeatured,
      averageRating: books.averageRating,
      totalRatings: books.totalRatings,
      totalRentals: books.totalRentals,
      createdAt: books.createdAt,
      author: {
        id: authors.id,
        name: authors.name,
        bio: authors.bio,
        imageUrl: authors.imageUrl,
      },
      genre: {
        id: genres.id,
        name: genres.name,
        slug: genres.slug,
      },
    })
    .from(books)
    .leftJoin(authors, eq(books.authorId, authors.id))
    .leftJoin(genres, eq(books.genreId, genres.id))
    .where(eq(books.slug, bookSlug));

  const [book] = await query;

  if (!book) {
    return null;
  }

  // Get availability from libraries with detailed information
  let librariesQuery = db
    .select({
      id: libraries.id,
      name: libraries.name,
      slug: libraries.slug,
      city: libraries.city,
      state: libraries.state,
      postalCode: libraries.postalCode,
      addressLine1: libraries.addressLine1,
      addressLine2: libraries.addressLine2,
      phone: libraries.phone,
      email: libraries.email,
      totalCopies: libraryBooks.totalCopies,
      availableCopies: libraryBooks.availableCopies,
      isAvailable: libraryBooks.isAvailable,
    })
    .from(libraryBooks)
    .innerJoin(libraries, eq(libraryBooks.libraryId, libraries.id));

  // Build library conditions
  const libConditions = [eq(libraryBooks.bookId, book.id)];

  // Filter by location if provided
  if (pincode) {
    libConditions.push(eq(libraries.postalCode, pincode));
  } else if (location) {
    libConditions.push(ilike(libraries.city, `%${location}%`));
  }

  // Apply conditions
  if (libConditions.length > 1) {
    librariesQuery = librariesQuery.where(and(...libConditions));
  } else {
    librariesQuery = librariesQuery.where(libConditions[0]);
  }

  const availableLibraries = await librariesQuery;

  return {
    ...book,
    libraries: availableLibraries,
    totalAvailableCopies: availableLibraries.reduce(
      (sum, lib) => sum + (lib.availableCopies || 0),
      0
    ),
  };
};

/**
 * Get featured books
 */
exports.getFeaturedBooksService = async (options = {}) => {
  const { limit = 12, location, pincode } = options;

  const conditions = [eq(books.isFeatured, true)];

  let query = db
    .select({
      id: books.id,
      title: books.title,
      slug: books.slug,
      coverImage: books.coverImage,
      rentalPricePerWeek: books.rentalPricePerWeek,
      depositAmount: books.depositAmount,
      condition: books.condition,
      averageRating: books.averageRating,
      totalRatings: books.totalRatings,
      author: {
        id: authors.id,
        name: authors.name,
      },
      genre: {
        id: genres.id,
        name: genres.name,
        slug: genres.slug,
      },
      availableCopies:
        sql`COALESCE(SUM(${libraryBooks.availableCopies}), 0)`.as(
          "available_copies"
        ),
    })
    .from(books)
    .leftJoin(authors, eq(books.authorId, authors.id))
    .leftJoin(genres, eq(books.genreId, genres.id))
    .leftJoin(libraryBooks, eq(books.id, libraryBooks.bookId));

  if (location || pincode) {
    query = query.leftJoin(libraries, eq(libraryBooks.libraryId, libraries.id));
    if (pincode) {
      conditions.push(eq(libraries.postalCode, pincode));
    } else if (location) {
      conditions.push(ilike(libraries.city, `%${location}%`));
    }
  }

  query = query
    .where(and(...conditions))
    .groupBy(books.id, authors.id, genres.id)
    .orderBy(desc(books.averageRating))
    .limit(limit);

  return await query;
};

/**
 * Get most rented books
 */
exports.getMostRentedBooksService = async (options = {}) => {
  const { limit = 12, location, pincode } = options;

  const conditions = [];

  let query = db
    .select({
      id: books.id,
      title: books.title,
      slug: books.slug,
      coverImage: books.coverImage,
      rentalPricePerWeek: books.rentalPricePerWeek,
      depositAmount: books.depositAmount,
      condition: books.condition,
      averageRating: books.averageRating,
      totalRatings: books.totalRatings,
      totalRentals: books.totalRentals,
      author: {
        id: authors.id,
        name: authors.name,
      },
      genre: {
        id: genres.id,
        name: genres.name,
        slug: genres.slug,
      },
      availableCopies:
        sql`COALESCE(SUM(${libraryBooks.availableCopies}), 0)`.as(
          "available_copies"
        ),
    })
    .from(books)
    .leftJoin(authors, eq(books.authorId, authors.id))
    .leftJoin(genres, eq(books.genreId, genres.id))
    .leftJoin(libraryBooks, eq(books.id, libraryBooks.bookId));

  if (location || pincode) {
    query = query.leftJoin(libraries, eq(libraryBooks.libraryId, libraries.id));
    if (pincode) {
      conditions.push(eq(libraries.postalCode, pincode));
    } else if (location) {
      conditions.push(ilike(libraries.city, `%${location}%`));
    }
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  query = query
    .groupBy(books.id, authors.id, genres.id)
    .orderBy(desc(books.totalRentals))
    .limit(limit);

  return await query;
};

/**
 * Get books by genre
 */
exports.getBooksByGenreService = async (genreSlug, options = {}) => {
  const {
    page = 1,
    limit = 12,
    sortBy = "relevance",
    location,
    pincode,
  } = options;
  const offset = (page - 1) * limit;

  const conditions = [eq(genres.slug, genreSlug)];

  let query = db
    .select({
      id: books.id,
      title: books.title,
      slug: books.slug,
      coverImage: books.coverImage,
      rentalPricePerWeek: books.rentalPricePerWeek,
      depositAmount: books.depositAmount,
      condition: books.condition,
      averageRating: books.averageRating,
      totalRatings: books.totalRatings,
      totalRentals: books.totalRentals,
      author: {
        id: authors.id,
        name: authors.name,
      },
      genre: {
        id: genres.id,
        name: genres.name,
        slug: genres.slug,
      },
      availableCopies:
        sql`COALESCE(SUM(${libraryBooks.availableCopies}), 0)`.as(
          "available_copies"
        ),
    })
    .from(books)
    .leftJoin(authors, eq(books.authorId, authors.id))
    .leftJoin(genres, eq(books.genreId, genres.id))
    .leftJoin(libraryBooks, eq(books.id, libraryBooks.bookId));

  if (location || pincode) {
    query = query.leftJoin(libraries, eq(libraryBooks.libraryId, libraries.id));
    if (pincode) {
      conditions.push(eq(libraries.postalCode, pincode));
    } else if (location) {
      conditions.push(ilike(libraries.city, `%${location}%`));
    }
  }

  query = query
    .where(and(...conditions))
    .groupBy(books.id, authors.id, genres.id);

  // Apply sorting
  switch (sortBy) {
    case "top_rated":
      query = query.orderBy(desc(books.averageRating));
      break;
    case "new_arrivals":
      query = query.orderBy(desc(books.createdAt));
      break;
    case "price_low":
      query = query.orderBy(asc(books.rentalPricePerWeek));
      break;
    case "price_high":
      query = query.orderBy(desc(books.rentalPricePerWeek));
      break;
    default:
      query = query.orderBy(desc(books.totalRentals));
  }

  // Get total count
  const countQuery = db
    .select({ count: sql`COUNT(DISTINCT ${books.id})` })
    .from(books)
    .leftJoin(genres, eq(books.genreId, genres.id))
    .where(eq(genres.slug, genreSlug));

  const [{ count }] = await countQuery;
  const totalBooks = parseInt(count);

  // Apply pagination
  query = query.limit(limit).offset(offset);

  const booksData = await query;

  return {
    books: booksData,
    pagination: {
      page,
      limit,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      hasMore: page * limit < totalBooks,
    },
  };
};
