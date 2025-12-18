const { db } = require("../db/index.js");
const {
  books,
  authors,
  genres,
  libraryBooks,
  libraries,
} = require("../db/schema.js");
const { eq, and, ilike, or, sql } = require("drizzle-orm");
const { AppError } = require("../middlewares/error.middleware.js");

/**
 * Create a new book on the platform
 */
exports.createBook = async ({
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
  totalCopies = 1,
}) => {
  // Verify library exists
  const [library] = await db
    .select()
    .from(libraries)
    .where(eq(libraries.id, libraryId))
    .limit(1);

  if (!library) {
    throw new AppError("Library not found", 404);
  }

  // Find or create author
  let authorResult = await db
    .select()
    .from(authors)
    .where(eq(authors.name, authorName))
    .limit(1);

  let author;
  if (authorResult.length === 0) {
    [author] = await db
      .insert(authors)
      .values({ name: authorName })
      .returning();
  } else {
    author = authorResult[0];
  }

  // Find or create genre
  const genreSlug = genreName.toLowerCase().replace(/\s+/g, "-");
  let genreResult = await db
    .select()
    .from(genres)
    .where(eq(genres.slug, genreSlug))
    .limit(1);

  let genre;
  if (genreResult.length === 0) {
    [genre] = await db
      .insert(genres)
      .values({ name: genreName, slug: genreSlug })
      .returning();
  } else {
    genre = genreResult[0];
  }

  // Create slug from title
  const slug = title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

  // Create book
  const [book] = await db
    .insert(books)
    .values({
      title,
      slug,
      authorId: author.id,
      genreId: genre.id,
      isbn,
      description,
      coverImage,
      publisher,
      publishedYear,
      language: language || "English",
      totalPages,
      rentalPricePerWeek,
      depositAmount,
      condition: condition || "good",
    })
    .returning();

  // Add book to library inventory
  const [libraryBook] = await db
    .insert(libraryBooks)
    .values({
      libraryId,
      bookId: book.id,
      totalCopies,
      availableCopies: totalCopies,
      isAvailable: totalCopies > 0,
    })
    .returning();

  return {
    book,
    libraryBook,
    author,
    genre,
  };
};

/**
 * Update book details
 */
exports.updateBook = async ({ libraryId, bookId, updateData }) => {
  // Check if book exists and belongs to library
  const [libraryBook] = await db
    .select()
    .from(libraryBooks)
    .where(
      and(
        eq(libraryBooks.libraryId, libraryId),
        eq(libraryBooks.bookId, bookId)
      )
    )
    .limit(1);

  if (!libraryBook) {
    throw new AppError("Book not found in your library", 404);
  }

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
  } = updateData;

  const bookUpdates = {};

  // Handle author update
  if (authorName) {
    let authorResult = await db
      .select()
      .from(authors)
      .where(eq(authors.name, authorName))
      .limit(1);

    let author;
    if (authorResult.length === 0) {
      [author] = await db
        .insert(authors)
        .values({ name: authorName })
        .returning();
    } else {
      author = authorResult[0];
    }
    bookUpdates.authorId = author.id;
  }

  // Handle genre update
  if (genreName) {
    const genreSlug = genreName.toLowerCase().replace(/\s+/g, "-");
    let genreResult = await db
      .select()
      .from(genres)
      .where(eq(genres.slug, genreSlug))
      .limit(1);

    let genre;
    if (genreResult.length === 0) {
      [genre] = await db
        .insert(genres)
        .values({ name: genreName, slug: genreSlug })
        .returning();
    } else {
      genre = genreResult[0];
    }
    bookUpdates.genreId = genre.id;
  }

  // Add other updates
  if (title) bookUpdates.title = title;
  if (isbn !== undefined) bookUpdates.isbn = isbn;
  if (description !== undefined) bookUpdates.description = description;
  if (coverImage !== undefined) bookUpdates.coverImage = coverImage;
  if (publisher !== undefined) bookUpdates.publisher = publisher;
  if (publishedYear !== undefined) bookUpdates.publishedYear = publishedYear;
  if (language !== undefined) bookUpdates.language = language;
  if (totalPages !== undefined) bookUpdates.totalPages = totalPages;
  if (rentalPricePerWeek !== undefined)
    bookUpdates.rentalPricePerWeek = rentalPricePerWeek;
  if (depositAmount !== undefined) bookUpdates.depositAmount = depositAmount;
  if (condition !== undefined) bookUpdates.condition = condition;

  // Update slug if title changed
  if (title) {
    bookUpdates.slug =
      title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
  }

  bookUpdates.updatedAt = new Date();

  // Update book
  const [updatedBook] = await db
    .update(books)
    .set(bookUpdates)
    .where(eq(books.id, bookId))
    .returning();

  return updatedBook;
};

/**
 * Delete a book from the platform
 * Only allowed if no active rentals exist
 */
exports.deleteBook = async ({ libraryId, bookId }) => {
  // Check if book exists and belongs to library
  const [libraryBook] = await db
    .select()
    .from(libraryBooks)
    .where(
      and(
        eq(libraryBooks.libraryId, libraryId),
        eq(libraryBooks.bookId, bookId)
      )
    )
    .limit(1);

  if (!libraryBook) {
    throw new AppError("Book not found in your library", 404);
  }

  // Delete library book entry first
  await db
    .delete(libraryBooks)
    .where(
      and(
        eq(libraryBooks.libraryId, libraryId),
        eq(libraryBooks.bookId, bookId)
      )
    );

  // Check if book exists in other libraries
  const otherLibraries = await db
    .select()
    .from(libraryBooks)
    .where(eq(libraryBooks.bookId, bookId))
    .limit(1);

  // If book doesn't exist in other libraries, delete the book
  if (otherLibraries.length === 0) {
    await db.delete(books).where(eq(books.id, bookId));
  }

  return true;
};

/**
 * Get all books in library's inventory
 */
exports.getLibraryBooks = async ({ libraryId, page, limit, search }) => {
  const offset = (page - 1) * limit;

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
      },
      libraryBook: {
        totalCopies: libraryBooks.totalCopies,
        availableCopies: libraryBooks.availableCopies,
        isAvailable: libraryBooks.isAvailable,
      },
    })
    .from(libraryBooks)
    .innerJoin(books, eq(libraryBooks.bookId, books.id))
    .leftJoin(authors, eq(books.authorId, authors.id))
    .leftJoin(genres, eq(books.genreId, genres.id))
    .where(eq(libraryBooks.libraryId, libraryId));

  // Add search filter
  if (search) {
    query = query.where(
      or(
        ilike(books.title, `%${search}%`),
        ilike(authors.name, `%${search}%`),
        ilike(books.isbn, `%${search}%`)
      )
    );
  }

  const booksData = await query.limit(limit).offset(offset);

  // Get total count
  let countQuery = db
    .select({ count: sql`count(*)::int` })
    .from(libraryBooks)
    .innerJoin(books, eq(libraryBooks.bookId, books.id))
    .leftJoin(authors, eq(books.authorId, authors.id))
    .where(eq(libraryBooks.libraryId, libraryId));

  if (search) {
    countQuery = countQuery.where(
      or(
        ilike(books.title, `%${search}%`),
        ilike(authors.name, `%${search}%`),
        ilike(books.isbn, `%${search}%`)
      )
    );
  }

  const [{ count }] = await countQuery;

  return {
    books: booksData,
    pagination: {
      page,
      limit,
      total: parseInt(count),
      totalPages: Math.ceil(parseInt(count) / limit),
    },
  };
};

/**
 * Add existing book to library inventory
 */
exports.addBookToLibrary = async ({ libraryId, bookId, totalCopies }) => {
  // Check if book exists
  const [book] = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  // Check if book already in library
  const existing = await db
    .select()
    .from(libraryBooks)
    .where(
      and(
        eq(libraryBooks.libraryId, libraryId),
        eq(libraryBooks.bookId, bookId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    throw new AppError("Book already exists in your library", 400);
  }

  // Add to library
  const [libraryBook] = await db
    .insert(libraryBooks)
    .values({
      libraryId,
      bookId,
      totalCopies,
      availableCopies: totalCopies,
      isAvailable: totalCopies > 0,
    })
    .returning();

  return libraryBook;
};

/**
 * Update library book stock
 */
exports.updateLibraryBookStock = async ({
  libraryId,
  bookId,
  totalCopies,
  availableCopies,
}) => {
  // Check if book exists in library
  const [existing] = await db
    .select()
    .from(libraryBooks)
    .where(
      and(
        eq(libraryBooks.libraryId, libraryId),
        eq(libraryBooks.bookId, bookId)
      )
    )
    .limit(1);

  if (!existing) {
    throw new AppError("Book not found in your library", 404);
  }

  const updates = {};
  if (totalCopies !== undefined) updates.totalCopies = totalCopies;
  if (availableCopies !== undefined) updates.availableCopies = availableCopies;

  // Update availability status
  const newAvailableCopies =
    availableCopies !== undefined ? availableCopies : existing.availableCopies;
  updates.isAvailable = newAvailableCopies > 0;
  updates.updatedAt = new Date();

  const [updated] = await db
    .update(libraryBooks)
    .set(updates)
    .where(
      and(
        eq(libraryBooks.libraryId, libraryId),
        eq(libraryBooks.bookId, bookId)
      )
    )
    .returning();

  return updated;
};

/**
 * Remove book from library inventory
 */
exports.removeBookFromLibrary = async ({ libraryId, bookId }) => {
  // Check if book exists in library
  const [existing] = await db
    .select()
    .from(libraryBooks)
    .where(
      and(
        eq(libraryBooks.libraryId, libraryId),
        eq(libraryBooks.bookId, bookId)
      )
    )
    .limit(1);

  if (!existing) {
    throw new AppError("Book not found in your library", 404);
  }

  // Delete from library
  await db
    .delete(libraryBooks)
    .where(
      and(
        eq(libraryBooks.libraryId, libraryId),
        eq(libraryBooks.bookId, bookId)
      )
    );

  return true;
};
