const { db } = require("./index.js");
const { sql } = require("drizzle-orm");
const bcrypt = require("bcrypt");
const {
  users,
  addresses,
  genres,
  authors,
  libraries,
  books,
  libraryBooks,
  subscriptionPlans,
} = require("./schema.js");

async function seed() {
  console.log("🌱 Starting database seeding...\n");

  try {
    // ==================== CLEANUP ====================
    console.log("🧹 Cleaning up existing data...");
    // Truncate all tables in correct order (respecting foreign keys)
    await db.execute(sql`TRUNCATE TABLE 
      subscription_payments,
      user_subscriptions,
      subscription_plans,
      notifications,
      rental_tracking,
      reviews,
      wishlists,
      payments,
      deposit_transactions,
      rentals,
      library_books,
      books,
      libraries,
      authors,
      genres,
      addresses,
      users
      RESTART IDENTITY CASCADE`);
    console.log("   ✓ All tables truncated\n");

    // ==================== GENRES ====================
    console.log("📚 Seeding genres...");
    const genresData = [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Mystery", slug: "mystery" },
      { name: "Thriller", slug: "thriller" },
      { name: "Romance", slug: "romance" },
      { name: "Science Fiction", slug: "science-fiction" },
      { name: "Fantasy", slug: "fantasy" },
      { name: "Biography", slug: "biography" },
      { name: "Self-Help", slug: "self-help" },
      { name: "History", slug: "history" },
      { name: "Business", slug: "business" },
      { name: "Technology", slug: "technology" },
      { name: "Philosophy", slug: "philosophy" },
      { name: "Psychology", slug: "psychology" },
      { name: "Horror", slug: "horror" },
    ];
    const insertedGenres = await db
      .insert(genres)
      .values(genresData)
      .returning();
    console.log(`   ✓ Inserted ${insertedGenres.length} genres`);

    // ==================== AUTHORS ====================
    console.log("✍️  Seeding authors...");
    const authorsData = [
      {
        name: "Chetan Bhagat",
        bio: "Indian author known for his popular fiction novels that capture the essence of modern Indian youth.",
        imageUrl: "https://example.com/authors/chetan-bhagat.jpg",
      },
      {
        name: "Ruskin Bond",
        bio: "Award-winning Indian author of British descent, known for his stories set in the Indian Himalayas.",
        imageUrl: "https://example.com/authors/ruskin-bond.jpg",
      },
      {
        name: "Arundhati Roy",
        bio: "Indian author best known for The God of Small Things, which won the Booker Prize in 1997.",
        imageUrl: "https://example.com/authors/arundhati-roy.jpg",
      },
      {
        name: "R.K. Narayan",
        bio: "One of the most famous Indian authors who wrote in English, known for his works set in the fictional town of Malgudi.",
        imageUrl: "https://example.com/authors/rk-narayan.jpg",
      },
      {
        name: "Amish Tripathi",
        bio: "Indian author known for mythological fiction, particularly the Shiva Trilogy.",
        imageUrl: "https://example.com/authors/amish-tripathi.jpg",
      },
      {
        name: "Sudha Murty",
        bio: "Indian author and philanthropist known for her simple yet profound stories.",
        imageUrl: "https://example.com/authors/sudha-murty.jpg",
      },
      {
        name: "Vikram Seth",
        bio: "Indian poet and novelist, author of the epic novel A Suitable Boy.",
        imageUrl: "https://example.com/authors/vikram-seth.jpg",
      },
      {
        name: "Jhumpa Lahiri",
        bio: "Indian-American author known for her short stories and novels about the Indian immigrant experience.",
        imageUrl: "https://example.com/authors/jhumpa-lahiri.jpg",
      },
      {
        name: "Devdutt Pattanaik",
        bio: "Indian mythologist and author who writes on Hindu sacred lore and culture.",
        imageUrl: "https://example.com/authors/devdutt-pattanaik.jpg",
      },
      {
        name: "Ashwin Sanghi",
        bio: "Indian thriller writer known for his mythology-based fiction.",
        imageUrl: "https://example.com/authors/ashwin-sanghi.jpg",
      },
      {
        name: "George Orwell",
        bio: "English novelist and essayist, known for 1984 and Animal Farm.",
        imageUrl: "https://example.com/authors/george-orwell.jpg",
      },
      {
        name: "Paulo Coelho",
        bio: "Brazilian lyricist and novelist, best known for The Alchemist.",
        imageUrl: "https://example.com/authors/paulo-coelho.jpg",
      },
      {
        name: "Dan Brown",
        bio: "American author best known for his thriller novels including The Da Vinci Code.",
        imageUrl: "https://example.com/authors/dan-brown.jpg",
      },
      {
        name: "J.K. Rowling",
        bio: "British author, best known for the Harry Potter fantasy series.",
        imageUrl: "https://example.com/authors/jk-rowling.jpg",
      },
      {
        name: "Stephen King",
        bio: "American author of horror, supernatural fiction, and suspense novels.",
        imageUrl: "https://example.com/authors/stephen-king.jpg",
      },
    ];
    const insertedAuthors = await db
      .insert(authors)
      .values(authorsData)
      .returning();
    console.log(`   ✓ Inserted ${insertedAuthors.length} authors`);

    // Create author lookup map
    const authorMap = {};
    insertedAuthors.forEach((a) => (authorMap[a.name] = a.id));

    // Create genre lookup map
    const genreMap = {};
    insertedGenres.forEach((g) => (genreMap[g.name] = g.id));

    // ==================== LIBRARIES ====================
    console.log("🏛️  Seeding libraries...");
    const libraryPassword = await bcrypt.hash("library123", 10);
    const librariesData = [
      {
        name: "Central Library Mumbai",
        slug: "central-library-mumbai",
        description:
          "The largest public library in Mumbai with an extensive collection of books across all genres.",
        imageUrl: "https://example.com/libraries/mumbai-central.jpg",
        addressLine1: "123 Marine Drive",
        addressLine2: "Near Gateway of India",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001",
        country: "India",
        phone: "+91-22-12345678",
        email: "contact@centrallibrarymumbai.com",
        password: libraryPassword,
        status: "approved",
        operatingHours: JSON.stringify({
          monday: "9:00 AM - 8:00 PM",
          tuesday: "9:00 AM - 8:00 PM",
          wednesday: "9:00 AM - 8:00 PM",
          thursday: "9:00 AM - 8:00 PM",
          friday: "9:00 AM - 8:00 PM",
          saturday: "10:00 AM - 6:00 PM",
          sunday: "Closed",
        }),
        isActive: true,
      },
      {
        name: "Delhi Public Library",
        slug: "delhi-public-library",
        description:
          "One of the oldest and most prestigious libraries in the capital city.",
        imageUrl: "https://example.com/libraries/delhi-public.jpg",
        addressLine1: "45 Connaught Place",
        addressLine2: "Block A",
        city: "New Delhi",
        state: "Delhi",
        postalCode: "110001",
        country: "India",
        phone: "+91-11-23456789",
        email: "info@delhipubliclibrary.org",
        password: libraryPassword,
        status: "approved",
        operatingHours: JSON.stringify({
          monday: "8:00 AM - 9:00 PM",
          tuesday: "8:00 AM - 9:00 PM",
          wednesday: "8:00 AM - 9:00 PM",
          thursday: "8:00 AM - 9:00 PM",
          friday: "8:00 AM - 9:00 PM",
          saturday: "9:00 AM - 5:00 PM",
          sunday: "9:00 AM - 5:00 PM",
        }),
        isActive: true,
      },
      {
        name: "Bangalore Central Library",
        slug: "bangalore-central-library",
        description:
          "A modern library in the heart of India's tech hub with excellent tech and business book collections.",
        imageUrl: "https://example.com/libraries/bangalore-central.jpg",
        addressLine1: "789 MG Road",
        addressLine2: "Trinity Circle",
        city: "Bangalore",
        state: "Karnataka",
        postalCode: "560001",
        country: "India",
        phone: "+91-80-34567890",
        email: "hello@bangalorelibrary.in",
        password: libraryPassword,
        status: "approved",
        operatingHours: JSON.stringify({
          monday: "9:00 AM - 9:00 PM",
          tuesday: "9:00 AM - 9:00 PM",
          wednesday: "9:00 AM - 9:00 PM",
          thursday: "9:00 AM - 9:00 PM",
          friday: "9:00 AM - 9:00 PM",
          saturday: "10:00 AM - 7:00 PM",
          sunday: "10:00 AM - 5:00 PM",
        }),
        isActive: true,
      },
      {
        name: "Chennai Book House",
        slug: "chennai-book-house",
        description:
          "A heritage library with a rich collection of Tamil and English literature.",
        imageUrl: "https://example.com/libraries/chennai-bookhouse.jpg",
        addressLine1: "56 Anna Salai",
        addressLine2: "Near Spencer Plaza",
        city: "Chennai",
        state: "Tamil Nadu",
        postalCode: "600002",
        country: "India",
        phone: "+91-44-45678901",
        email: "contact@chennaibookhouse.com",
        password: libraryPassword,
        status: "approved",
        operatingHours: JSON.stringify({
          monday: "9:30 AM - 7:30 PM",
          tuesday: "9:30 AM - 7:30 PM",
          wednesday: "9:30 AM - 7:30 PM",
          thursday: "9:30 AM - 7:30 PM",
          friday: "9:30 AM - 7:30 PM",
          saturday: "10:00 AM - 6:00 PM",
          sunday: "Closed",
        }),
        isActive: true,
      },
      {
        name: "Kolkata Literary Hub",
        slug: "kolkata-literary-hub",
        description:
          "A cultural center and library celebrating Bengal's rich literary heritage.",
        imageUrl: "https://example.com/libraries/kolkata-literary.jpg",
        addressLine1: "23 Park Street",
        addressLine2: "Near Indian Museum",
        city: "Kolkata",
        state: "West Bengal",
        postalCode: "700016",
        country: "India",
        phone: "+91-33-56789012",
        email: "info@kolkataliteraryhub.org",
        password: libraryPassword,
        status: "approved",
        operatingHours: JSON.stringify({
          monday: "10:00 AM - 8:00 PM",
          tuesday: "10:00 AM - 8:00 PM",
          wednesday: "10:00 AM - 8:00 PM",
          thursday: "10:00 AM - 8:00 PM",
          friday: "10:00 AM - 8:00 PM",
          saturday: "10:00 AM - 6:00 PM",
          sunday: "11:00 AM - 4:00 PM",
        }),
        isActive: true,
      },
    ];
    const insertedLibraries = await db
      .insert(libraries)
      .values(librariesData)
      .returning();
    console.log(`   ✓ Inserted ${insertedLibraries.length} libraries`);

    // Create library lookup map
    const libraryMap = {};
    insertedLibraries.forEach((l) => (libraryMap[l.name] = l.id));

    // ==================== BOOKS ====================
    console.log("📖 Seeding books...");
    const booksData = [
      // Indian Fiction
      {
        title: "Five Point Someone",
        slug: "five-point-someone",
        authorId: authorMap["Chetan Bhagat"],
        genreId: genreMap["Fiction"],
        isbn: "9788129135476",
        description:
          "The story of three friends at IIT who struggle with the system and find their own way to success.",
        coverImage: "https://example.com/books/five-point-someone.jpg",
        publisher: "Rupa Publications",
        publishedYear: 2004,
        language: "English",
        totalPages: 270,
        rentalPricePerWeek: "25.00",
        depositAmount: "150.00",
        condition: "good",
        isFeatured: true,
      },
      {
        title: "2 States",
        slug: "2-states",
        authorId: authorMap["Chetan Bhagat"],
        genreId: genreMap["Romance"],
        isbn: "9788129115300",
        description:
          "A cross-cultural love story between a Punjabi boy and a Tamil Brahmin girl.",
        coverImage: "https://example.com/books/2-states.jpg",
        publisher: "Rupa Publications",
        publishedYear: 2009,
        language: "English",
        totalPages: 280,
        rentalPricePerWeek: "30.00",
        depositAmount: "180.00",
        condition: "like_new",
        isFeatured: true,
      },
      {
        title: "The Room on the Roof",
        slug: "the-room-on-the-roof",
        authorId: authorMap["Ruskin Bond"],
        genreId: genreMap["Fiction"],
        isbn: "9780140116830",
        description:
          "The story of a young Anglo-Indian boy who leaves his guardians to live in the bazaar of a small town.",
        coverImage: "https://example.com/books/room-on-roof.jpg",
        publisher: "Penguin Books",
        publishedYear: 1956,
        language: "English",
        totalPages: 192,
        rentalPricePerWeek: "20.00",
        depositAmount: "120.00",
        condition: "good",
        isFeatured: false,
      },
      {
        title: "The God of Small Things",
        slug: "the-god-of-small-things",
        authorId: authorMap["Arundhati Roy"],
        genreId: genreMap["Fiction"],
        isbn: "9780679457312",
        description:
          "A story about the childhood experiences of fraternal twins in Kerala.",
        coverImage: "https://example.com/books/god-of-small-things.jpg",
        publisher: "Random House",
        publishedYear: 1997,
        language: "English",
        totalPages: 340,
        rentalPricePerWeek: "35.00",
        depositAmount: "200.00",
        condition: "good",
        isFeatured: true,
      },
      {
        title: "Malgudi Days",
        slug: "malgudi-days",
        authorId: authorMap["R.K. Narayan"],
        genreId: genreMap["Fiction"],
        isbn: "9780140185430",
        description:
          "A collection of short stories set in the fictional town of Malgudi.",
        coverImage: "https://example.com/books/malgudi-days.jpg",
        publisher: "Penguin Books",
        publishedYear: 1982,
        language: "English",
        totalPages: 256,
        rentalPricePerWeek: "20.00",
        depositAmount: "100.00",
        condition: "fair",
        isFeatured: false,
      },
      {
        title: "The Immortals of Meluha",
        slug: "the-immortals-of-meluha",
        authorId: authorMap["Amish Tripathi"],
        genreId: genreMap["Fantasy"],
        isbn: "9789380658742",
        description:
          "The first book of the Shiva Trilogy, reimagining Lord Shiva as a human hero.",
        coverImage: "https://example.com/books/immortals-meluha.jpg",
        publisher: "Westland",
        publishedYear: 2010,
        language: "English",
        totalPages: 400,
        rentalPricePerWeek: "40.00",
        depositAmount: "250.00",
        condition: "like_new",
        isFeatured: true,
      },
      {
        title: "The Secret of the Nagas",
        slug: "the-secret-of-the-nagas",
        authorId: authorMap["Amish Tripathi"],
        genreId: genreMap["Fantasy"],
        isbn: "9789380658759",
        description: "The second book of the Shiva Trilogy.",
        coverImage: "https://example.com/books/secret-nagas.jpg",
        publisher: "Westland",
        publishedYear: 2011,
        language: "English",
        totalPages: 368,
        rentalPricePerWeek: "40.00",
        depositAmount: "250.00",
        condition: "good",
        isFeatured: false,
      },
      {
        title: "Wise and Otherwise",
        slug: "wise-and-otherwise",
        authorId: authorMap["Sudha Murty"],
        genreId: genreMap["Non-Fiction"],
        isbn: "9780143062998",
        description:
          "A collection of 51 true short stories about extraordinary people the author met during her work.",
        coverImage: "https://example.com/books/wise-otherwise.jpg",
        publisher: "Penguin Books",
        publishedYear: 2006,
        language: "English",
        totalPages: 232,
        rentalPricePerWeek: "25.00",
        depositAmount: "150.00",
        condition: "good",
        isFeatured: true,
      },
      {
        title: "A Suitable Boy",
        slug: "a-suitable-boy",
        authorId: authorMap["Vikram Seth"],
        genreId: genreMap["Fiction"],
        isbn: "9780060786526",
        description:
          "An epic novel set in post-independence India, following a mother's search for a suitable boy for her daughter.",
        coverImage: "https://example.com/books/suitable-boy.jpg",
        publisher: "Harper Perennial",
        publishedYear: 1993,
        language: "English",
        totalPages: 1488,
        rentalPricePerWeek: "50.00",
        depositAmount: "350.00",
        condition: "good",
        isFeatured: true,
      },
      {
        title: "The Namesake",
        slug: "the-namesake",
        authorId: authorMap["Jhumpa Lahiri"],
        genreId: genreMap["Fiction"],
        isbn: "9780618485222",
        description:
          "The story of the Ganguli family's journey from Calcutta to America.",
        coverImage: "https://example.com/books/namesake.jpg",
        publisher: "Houghton Mifflin",
        publishedYear: 2003,
        language: "English",
        totalPages: 291,
        rentalPricePerWeek: "30.00",
        depositAmount: "180.00",
        condition: "like_new",
        isFeatured: false,
      },
      {
        title: "Myth = Mithya",
        slug: "myth-mithya",
        authorId: authorMap["Devdutt Pattanaik"],
        genreId: genreMap["Philosophy"],
        isbn: "9780143423324",
        description:
          "A handbook of Hindu mythology decoded for modern readers.",
        coverImage: "https://example.com/books/myth-mithya.jpg",
        publisher: "Penguin Books",
        publishedYear: 2006,
        language: "English",
        totalPages: 232,
        rentalPricePerWeek: "25.00",
        depositAmount: "150.00",
        condition: "good",
        isFeatured: false,
      },
      {
        title: "The Rozabal Line",
        slug: "the-rozabal-line",
        authorId: authorMap["Ashwin Sanghi"],
        genreId: genreMap["Thriller"],
        isbn: "9788184950601",
        description:
          "A religious thriller that connects dots across time and continents.",
        coverImage: "https://example.com/books/rozabal-line.jpg",
        publisher: "Westland",
        publishedYear: 2008,
        language: "English",
        totalPages: 408,
        rentalPricePerWeek: "35.00",
        depositAmount: "200.00",
        condition: "good",
        isFeatured: false,
      },
      // International Bestsellers
      {
        title: "1984",
        slug: "1984-george-orwell",
        authorId: authorMap["George Orwell"],
        genreId: genreMap["Science Fiction"],
        isbn: "9780451524935",
        description:
          "A dystopian novel about totalitarianism and surveillance.",
        coverImage: "https://example.com/books/1984.jpg",
        publisher: "Signet Classic",
        publishedYear: 1949,
        language: "English",
        totalPages: 328,
        rentalPricePerWeek: "30.00",
        depositAmount: "180.00",
        condition: "good",
        isFeatured: true,
      },
      {
        title: "Animal Farm",
        slug: "animal-farm",
        authorId: authorMap["George Orwell"],
        genreId: genreMap["Fiction"],
        isbn: "9780451526342",
        description:
          "An allegorical novella reflecting events leading to the Russian Revolution.",
        coverImage: "https://example.com/books/animal-farm.jpg",
        publisher: "Signet Classic",
        publishedYear: 1945,
        language: "English",
        totalPages: 112,
        rentalPricePerWeek: "20.00",
        depositAmount: "100.00",
        condition: "like_new",
        isFeatured: false,
      },
      {
        title: "The Alchemist",
        slug: "the-alchemist",
        authorId: authorMap["Paulo Coelho"],
        genreId: genreMap["Fiction"],
        isbn: "9780062315007",
        description:
          "A philosophical book about a shepherd boy's journey to find treasure.",
        coverImage: "https://example.com/books/alchemist.jpg",
        publisher: "HarperOne",
        publishedYear: 1988,
        language: "English",
        totalPages: 208,
        rentalPricePerWeek: "25.00",
        depositAmount: "150.00",
        condition: "good",
        isFeatured: true,
      },
      {
        title: "The Da Vinci Code",
        slug: "the-da-vinci-code",
        authorId: authorMap["Dan Brown"],
        genreId: genreMap["Thriller"],
        isbn: "9780307474278",
        description:
          "A mystery thriller involving the murder of a curator at the Louvre Museum.",
        coverImage: "https://example.com/books/da-vinci-code.jpg",
        publisher: "Anchor",
        publishedYear: 2003,
        language: "English",
        totalPages: 489,
        rentalPricePerWeek: "35.00",
        depositAmount: "220.00",
        condition: "good",
        isFeatured: true,
      },
      {
        title: "Angels & Demons",
        slug: "angels-and-demons",
        authorId: authorMap["Dan Brown"],
        genreId: genreMap["Thriller"],
        isbn: "9781416524793",
        description:
          "A techno-thriller involving the Illuminati and the Vatican.",
        coverImage: "https://example.com/books/angels-demons.jpg",
        publisher: "Pocket Books",
        publishedYear: 2000,
        language: "English",
        totalPages: 736,
        rentalPricePerWeek: "35.00",
        depositAmount: "220.00",
        condition: "fair",
        isFeatured: false,
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        slug: "harry-potter-philosophers-stone",
        authorId: authorMap["J.K. Rowling"],
        genreId: genreMap["Fantasy"],
        isbn: "9780747532743",
        description:
          "The first book in the Harry Potter series about a young wizard.",
        coverImage: "https://example.com/books/hp-philosophers-stone.jpg",
        publisher: "Bloomsbury",
        publishedYear: 1997,
        language: "English",
        totalPages: 309,
        rentalPricePerWeek: "30.00",
        depositAmount: "200.00",
        condition: "like_new",
        isFeatured: true,
      },
      {
        title: "Harry Potter and the Chamber of Secrets",
        slug: "harry-potter-chamber-of-secrets",
        authorId: authorMap["J.K. Rowling"],
        genreId: genreMap["Fantasy"],
        isbn: "9780747538486",
        description: "The second book in the Harry Potter series.",
        coverImage: "https://example.com/books/hp-chamber-secrets.jpg",
        publisher: "Bloomsbury",
        publishedYear: 1998,
        language: "English",
        totalPages: 341,
        rentalPricePerWeek: "30.00",
        depositAmount: "200.00",
        condition: "good",
        isFeatured: false,
      },
      {
        title: "The Shining",
        slug: "the-shining",
        authorId: authorMap["Stephen King"],
        genreId: genreMap["Horror"],
        isbn: "9780307743657",
        description:
          "A horror novel about a family staying at an isolated hotel with supernatural forces.",
        coverImage: "https://example.com/books/shining.jpg",
        publisher: "Anchor",
        publishedYear: 1977,
        language: "English",
        totalPages: 688,
        rentalPricePerWeek: "35.00",
        depositAmount: "200.00",
        condition: "good",
        isFeatured: false,
      },
      {
        title: "It",
        slug: "it-stephen-king",
        authorId: authorMap["Stephen King"],
        genreId: genreMap["Horror"],
        isbn: "9781501142970",
        description:
          "A horror novel about seven children terrorized by an evil clown.",
        coverImage: "https://example.com/books/it.jpg",
        publisher: "Scribner",
        publishedYear: 1986,
        language: "English",
        totalPages: 1138,
        rentalPricePerWeek: "45.00",
        depositAmount: "280.00",
        condition: "like_new",
        isFeatured: true,
      },
      // Self-Help & Business
      {
        title: "The Monk Who Sold His Ferrari",
        slug: "monk-who-sold-his-ferrari",
        authorId: null,
        genreId: genreMap["Self-Help"],
        isbn: "9780062515674",
        description:
          "A spiritual fable about a lawyer's journey of self-discovery.",
        coverImage: "https://example.com/books/monk-ferrari.jpg",
        publisher: "HarperOne",
        publishedYear: 1999,
        language: "English",
        totalPages: 198,
        rentalPricePerWeek: "25.00",
        depositAmount: "150.00",
        condition: "good",
        isFeatured: true,
      },
      {
        title: "Rich Dad Poor Dad",
        slug: "rich-dad-poor-dad",
        authorId: null,
        genreId: genreMap["Business"],
        isbn: "9781612680194",
        description:
          "Personal finance book about financial literacy and building wealth.",
        coverImage: "https://example.com/books/rich-dad.jpg",
        publisher: "Plata Publishing",
        publishedYear: 1997,
        language: "English",
        totalPages: 336,
        rentalPricePerWeek: "30.00",
        depositAmount: "180.00",
        condition: "like_new",
        isFeatured: true,
      },
      {
        title: "Atomic Habits",
        slug: "atomic-habits",
        authorId: null,
        genreId: genreMap["Self-Help"],
        isbn: "9780735211292",
        description:
          "A practical guide to building good habits and breaking bad ones.",
        coverImage: "https://example.com/books/atomic-habits.jpg",
        publisher: "Avery",
        publishedYear: 2018,
        language: "English",
        totalPages: 320,
        rentalPricePerWeek: "35.00",
        depositAmount: "220.00",
        condition: "new",
        isFeatured: true,
      },
    ];
    const insertedBooks = await db.insert(books).values(booksData).returning();
    console.log(`   ✓ Inserted ${insertedBooks.length} books`);

    // ==================== LIBRARY BOOKS ====================
    console.log("📚 Seeding library books (linking books to libraries)...");
    const libraryBooksData = [];

    // Distribute books across libraries with varying quantities
    for (const book of insertedBooks) {
      // Each book appears in 2-4 random libraries
      const numLibraries = Math.floor(Math.random() * 3) + 2; // 2-4 libraries
      const libraryIds = Object.values(libraryMap);
      const shuffledLibraries = libraryIds.sort(() => Math.random() - 0.5);
      const selectedLibraries = shuffledLibraries.slice(0, numLibraries);

      for (const libraryId of selectedLibraries) {
        const totalCopies = Math.floor(Math.random() * 5) + 1; // 1-5 copies
        const availableCopies =
          Math.floor(Math.random() * totalCopies) + 1 || 1; // At least 1 available

        libraryBooksData.push({
          libraryId,
          bookId: book.id,
          totalCopies,
          availableCopies,
          isAvailable: availableCopies > 0,
        });
      }
    }
    const insertedLibraryBooks = await db
      .insert(libraryBooks)
      .values(libraryBooksData)
      .returning();
    console.log(
      `   ✓ Inserted ${insertedLibraryBooks.length} library-book links`
    );

    // ==================== SUBSCRIPTION PLANS ====================
    console.log("💳 Seeding subscription plans...");
    const subscriptionPlansData = [
      {
        name: "Premium Monthly",
        slug: "premium-monthly",
        description:
          "Unlimited rentals with up to 5 books per month. Perfect for avid readers!",
        pricePerMonth: "299.00",
        maxBooksPerMonth: 5,
        maxActiveRentals: 3,
        freeDelivery: true,
        prioritySupport: false,
        isActive: true,
      },
      {
        name: "Premium Plus",
        slug: "premium-plus",
        description:
          "Our best plan! Up to 10 books per month with priority support and free delivery.",
        pricePerMonth: "499.00",
        maxBooksPerMonth: 10,
        maxActiveRentals: 5,
        freeDelivery: true,
        prioritySupport: true,
        isActive: true,
      },
      {
        name: "Student Plan",
        slug: "student-plan",
        description:
          "Special discounted plan for students. Rent up to 3 books per month.",
        pricePerMonth: "149.00",
        maxBooksPerMonth: 3,
        maxActiveRentals: 2,
        freeDelivery: false,
        prioritySupport: false,
        isActive: true,
      },
    ];
    const insertedPlans = await db
      .insert(subscriptionPlans)
      .values(subscriptionPlansData)
      .returning();
    console.log(`   ✓ Inserted ${insertedPlans.length} subscription plans`);

    // ==================== SAMPLE USERS ====================
    console.log("👤 Seeding sample users...");
    const userPassword = await bcrypt.hash("abcd", 10);
    const usersData = [
      {
        email: "vikas@gmail.com",
        password: userPassword,
        fullName: "Vikas Saini",
        phone: "+91-9876543210",
        depositBalance: "500.00",
        lockedBalance: "0.00",
        isPremium: false,
        isVerified: true,
        isActive: true,
      },
      {
        email: "priya@gmail.com",
        password: userPassword,
        fullName: "Priya Patel",
        phone: "+91-9876543211",
        depositBalance: "1000.00",
        lockedBalance: "200.00",
        isPremium: true,
        isVerified: true,
        isActive: true,
      },
      {
        email: "amit@gmail.com",
        password: userPassword,
        fullName: "Amit Kumar",
        phone: "+91-9876543212",
        depositBalance: "750.00",
        lockedBalance: "150.00",
        isPremium: false,
        isVerified: true,
        isActive: true,
      },
      {
        email: "sneha@gmail.com",
        password: userPassword,
        fullName: "Sneha Reddy",
        phone: "+91-9876543213",
        depositBalance: "2000.00",
        lockedBalance: "500.00",
        isPremium: true,
        isVerified: true,
        isActive: true,
      },
      {
        email: "vikram@gmail.com",
        password: userPassword,
        fullName: "Vikram Singh",
        phone: "+91-9876543214",
        depositBalance: "300.00",
        lockedBalance: "0.00",
        isPremium: false,
        isVerified: false,
        isActive: true,
      },
    ];
    const insertedUsers = await db.insert(users).values(usersData).returning();
    console.log(`   ✓ Inserted ${insertedUsers.length} users`);

    // ==================== USER ADDRESSES ====================
    console.log("🏠 Seeding user addresses...");
    const addressesData = [
      {
        userId: insertedUsers[0].id,
        label: "home",
        fullName: "Rahul Sharma",
        phone: "+91-9876543210",
        addressLine1: "A-123, Sunrise Apartments",
        addressLine2: "Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400058",
        country: "India",
        isDefault: true,
      },
      {
        userId: insertedUsers[0].id,
        label: "work",
        fullName: "Rahul Sharma",
        phone: "+91-9876543210",
        addressLine1: "Tech Park, Building 5",
        addressLine2: "Powai",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400076",
        country: "India",
        isDefault: false,
      },
      {
        userId: insertedUsers[1].id,
        label: "home",
        fullName: "Priya Patel",
        phone: "+91-9876543211",
        addressLine1: "B-45, Green Valley",
        addressLine2: "Satellite",
        city: "Ahmedabad",
        state: "Gujarat",
        postalCode: "380015",
        country: "India",
        isDefault: true,
      },
      {
        userId: insertedUsers[2].id,
        label: "home",
        fullName: "Amit Kumar",
        phone: "+91-9876543212",
        addressLine1: "45, Model Town",
        addressLine2: "Sector 22",
        city: "Gurgaon",
        state: "Haryana",
        postalCode: "122001",
        country: "India",
        isDefault: true,
      },
      {
        userId: insertedUsers[3].id,
        label: "home",
        fullName: "Sneha Reddy",
        phone: "+91-9876543213",
        addressLine1: "Plot 78, Film Nagar",
        addressLine2: "Jubilee Hills",
        city: "Hyderabad",
        state: "Telangana",
        postalCode: "500033",
        country: "India",
        isDefault: true,
      },
      {
        userId: insertedUsers[4].id,
        label: "home",
        fullName: "Vikram Singh",
        phone: "+91-9876543214",
        addressLine1: "C-Block, Rajouri Garden",
        addressLine2: "Near Metro Station",
        city: "New Delhi",
        state: "Delhi",
        postalCode: "110027",
        country: "India",
        isDefault: true,
      },
    ];
    const insertedAddresses = await db
      .insert(addresses)
      .values(addressesData)
      .returning();
    console.log(`   ✓ Inserted ${insertedAddresses.length} addresses`);

    console.log("\n✅ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   • Genres: ${insertedGenres.length}`);
    console.log(`   • Authors: ${insertedAuthors.length}`);
    console.log(`   • Libraries: ${insertedLibraries.length}`);
    console.log(`   • Books: ${insertedBooks.length}`);
    console.log(`   • Library-Book Links: ${insertedLibraryBooks.length}`);
    console.log(`   • Subscription Plans: ${insertedPlans.length}`);
    console.log(`   • Users: ${insertedUsers.length}`);
    console.log(`   • Addresses: ${insertedAddresses.length}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed
seed()
  .then(() => {
    console.log("\n👋 Seed script finished. Exiting...");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
