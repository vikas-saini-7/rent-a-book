const { db } = require("../db/index.js");
const { books, genres } = require("../db/schema.js");
const { sql } = require("drizzle-orm");

/**
 * Get all available filter options for books
 */
exports.getFilterOptionsService = async () => {
  // Get all genres
  const allGenres = await db
    .select({
      id: genres.id,
      name: genres.name,
      slug: genres.slug,
    })
    .from(genres)
    .orderBy(genres.name);

  // Get available languages
  const languagesResult = await db
    .select({
      language: books.language,
      count: sql`COUNT(*)`.as("count"),
    })
    .from(books)
    .groupBy(books.language)
    .orderBy(books.language);

  // Get price range
  const priceRange = await db
    .select({
      minPrice: sql`MIN(${books.rentalPricePerWeek})`.as("min_price"),
      maxPrice: sql`MAX(${books.rentalPricePerWeek})`.as("max_price"),
    })
    .from(books);

  // Get available conditions
  const conditionsResult = await db
    .select({
      condition: books.condition,
      count: sql`COUNT(*)`.as("count"),
    })
    .from(books)
    .groupBy(books.condition)
    .orderBy(books.condition);

  return {
    genres: allGenres,
    languages: languagesResult.map((l) => ({
      value: l.language,
      count: parseInt(l.count),
    })),
    priceRange: {
      min: parseFloat(priceRange[0]?.minPrice || 0),
      max: parseFloat(priceRange[0]?.maxPrice || 100),
    },
    conditions: conditionsResult.map((c) => ({
      value: c.condition,
      count: parseInt(c.count),
    })),
    rentalPeriods: [
      { value: "1_week", label: "1 Week" },
      { value: "2_weeks", label: "2 Weeks" },
      { value: "1_month", label: "1 Month" },
      { value: "3_months", label: "3 Months" },
    ],
  };
};

/**
 * Get all genres
 */
exports.getAllGenresService = async () => {
  return await db
    .select({
      id: genres.id,
      name: genres.name,
      slug: genres.slug,
      bookCount: sql`COUNT(*)`.as("book_count"),
    })
    .from(genres)
    .leftJoin(books, sql`${genres.id} = ${books.genreId}`)
    .groupBy(genres.id)
    .orderBy(genres.name);
};
