const {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  uuid,
  integer,
  decimal,
  boolean,
  pgEnum,
} = require("drizzle-orm/pg-core");

// ==================== ENUMS ====================

const rentalStatusEnum = pgEnum("rental_status", [
  "active", // Book is currently rented
  "returned", // Book returned, deposit unlocked
  "cancelled", // Rental cancelled before pickup
]);

const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);

const paymentMethodEnum = pgEnum("payment_method", [
  "card",
  "upi",
  "net_banking",
  "wallet",
  "cod",
]);

const bookConditionEnum = pgEnum("book_condition", [
  "new",
  "like_new",
  "good",
  "fair",
  "poor",
]);

const depositTransactionTypeEnum = pgEnum("deposit_transaction_type", [
  "deposit", // User adds money to wallet
  "withdrawal", // User withdraws money (closing account)
  "rental_lock", // Amount locked for rental
  "rental_unlock", // Amount unlocked after return
  "damage_deduction", // Deduction for damaged book
  "refund", // Admin refund
]);

const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active", // Currently active subscription
  "cancelled", // User cancelled, will expire at period end
  "expired", // Subscription ended
  "paused", // Temporarily paused
]);

// ==================== USERS ====================

const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(), // hashed password
  fullName: varchar("full_name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  avatarUrl: text("avatar_url"),
  // Wallet/Deposit System
  depositBalance: decimal("deposit_balance", {
    precision: 10,
    scale: 2,
  }).default("0"), // Total deposited amount
  lockedBalance: decimal("locked_balance", { precision: 10, scale: 2 }).default(
    "0"
  ), // Amount locked in active rentals
  // Available balance = depositBalance - lockedBalance
  // Premium subscription
  isPremium: boolean("is_premium").default(false),
  isVerified: boolean("is_verified").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== ADDRESSES ====================

const addresses = pgTable("addresses", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  label: varchar("label", { length: 50 }), // home, work, other
  fullName: varchar("full_name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2"),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  country: varchar("country", { length: 100 }).default("India"),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== GENRES ====================

const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ==================== AUTHORS ====================

const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ==================== LIBRARIES ====================

const libraries = pgTable("libraries", {
  id: uuid("id").primaryKey().defaultRandom(),
  // Login credentials
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  // Library details
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  // Location details
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2"),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  country: varchar("country", { length: 100 }).default("India"),
  // Contact
  phone: varchar("phone", { length: 20 }),
  // Operating hours (can be JSON or separate fields)
  operatingHours: text("operating_hours"), // JSON string
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== BOOKS ====================

const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  authorId: integer("author_id").references(() => authors.id),
  genreId: integer("genre_id").references(() => genres.id),
  isbn: varchar("isbn", { length: 20 }),
  description: text("description"),
  coverImage: text("cover_image"),
  publisher: varchar("publisher", { length: 255 }),
  publishedYear: integer("published_year"),
  language: varchar("language", { length: 50 }).default("English"),
  totalPages: integer("total_pages"),
  // Rental price per week
  rentalPricePerWeek: decimal("rental_price_per_week", {
    precision: 10,
    scale: 2,
  }).notNull(),
  // Deposit required to rent this book (locked from user's wallet)
  depositAmount: decimal("deposit_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  condition: bookConditionEnum("condition").default("good"),
  isFeatured: boolean("is_featured").default(false),
  averageRating: decimal("average_rating", { precision: 2, scale: 1 }).default(
    "0"
  ),
  totalRatings: integer("total_ratings").default(0),
  totalRentals: integer("total_rentals").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== LIBRARY BOOKS (Junction Table) ====================
// Links books to libraries with quantity info

const libraryBooks = pgTable("library_books", {
  id: serial("id").primaryKey(),
  libraryId: uuid("library_id")
    .notNull()
    .references(() => libraries.id, { onDelete: "cascade" }),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  totalCopies: integer("total_copies").default(1),
  availableCopies: integer("available_copies").default(1),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== RENTALS ====================

const rentals = pgTable("rentals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  libraryBookId: integer("library_book_id")
    .notNull()
    .references(() => libraryBooks.id),
  addressId: uuid("address_id").references(() => addresses.id),
  // Rental period
  rentedAt: timestamp("rented_at").defaultNow(),
  returnedAt: timestamp("returned_at"),
  // Deposit locked for this rental (from user's wallet)
  lockedDeposit: decimal("locked_deposit", {
    precision: 10,
    scale: 2,
  }).notNull(),
  // Status tracking
  status: rentalStatusEnum("status").default("active"),
  // Damage fee if book returned damaged (deducted from deposit)
  damageFee: decimal("damage_fee", { precision: 10, scale: 2 }).default("0"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== DEPOSIT TRANSACTIONS ====================
// Tracks all money movements in user's deposit

const depositTransactions = pgTable("deposit_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  type: depositTransactionTypeEnum("type").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  balanceBefore: decimal("balance_before", {
    precision: 10,
    scale: 2,
  }).notNull(),
  balanceAfter: decimal("balance_after", { precision: 10, scale: 2 }).notNull(),
  // Reference to rental if transaction is rental-related
  rentalId: uuid("rental_id").references(() => rentals.id),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ==================== PAYMENTS ====================
// For actual money deposits/withdrawals via payment gateway

const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  depositTransactionId: uuid("deposit_transaction_id").references(
    () => depositTransactions.id
  ),
  type: varchar("type", { length: 20 }).notNull(), // deposit, withdrawal
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: paymentMethodEnum("payment_method"),
  paymentStatus: paymentStatusEnum("payment_status").default("pending"),
  // Payment gateway details
  paymentGateway: varchar("payment_gateway", { length: 50 }), // razorpay, stripe, etc.
  gatewayOrderId: varchar("gateway_order_id", { length: 255 }),
  gatewayPaymentId: varchar("gateway_payment_id", { length: 255 }),
  gatewaySignature: text("gateway_signature"),
  // For withdrawals
  bankAccountNumber: varchar("bank_account_number", { length: 50 }),
  bankIfsc: varchar("bank_ifsc", { length: 20 }),
  bankName: varchar("bank_name", { length: 100 }),
  // Timestamps
  paidAt: timestamp("paid_at"),
  failureReason: text("failure_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== WISHLIST ====================

const wishlists = pgTable("wishlists", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

// ==================== REVIEWS & RATINGS ====================

const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  rentalId: uuid("rental_id").references(() => rentals.id),
  rating: integer("rating").notNull(), // 1-5
  reviewText: text("review_text"),
  isVerifiedRental: boolean("is_verified_rental").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== RENTAL TRACKING ====================

const rentalTracking = pgTable("rental_tracking", {
  id: uuid("id").primaryKey().defaultRandom(),
  rentalId: uuid("rental_id")
    .notNull()
    .references(() => rentals.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 50 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  updatedBy: uuid("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// ==================== NOTIFICATIONS ====================

const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }), // rental, payment, reminder, promo
  referenceId: uuid("reference_id"), // rentalId or paymentId
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ==================== SUBSCRIPTION PLANS ====================

const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // e.g., "Premium Monthly"
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  // Pricing
  pricePerMonth: decimal("price_per_month", {
    precision: 10,
    scale: 2,
  }).notNull(),
  // Limits
  maxBooksPerMonth: integer("max_books_per_month").default(5), // Max books user can rent per month
  maxActiveRentals: integer("max_active_rentals").default(3), // Max books at a time
  // Features
  freeDelivery: boolean("free_delivery").default(true),
  prioritySupport: boolean("priority_support").default(false),
  // Status
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== USER SUBSCRIPTIONS ====================

const userSubscriptions = pgTable("user_subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  planId: integer("plan_id")
    .notNull()
    .references(() => subscriptionPlans.id),
  status: subscriptionStatusEnum("status").default("active"),
  // Billing period
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  // Usage tracking for current period
  booksRentedThisMonth: integer("books_rented_this_month").default(0),
  // Autopay details
  autopayEnabled: boolean("autopay_enabled").default(true),
  // Razorpay subscription ID for autopay
  razorpaySubscriptionId: varchar("razorpay_subscription_id", { length: 255 }),
  // Cancellation
  cancelledAt: timestamp("cancelled_at"),
  cancelReason: text("cancel_reason"),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== SUBSCRIPTION PAYMENTS ====================
// Track recurring payments for subscriptions

const subscriptionPayments = pgTable("subscription_payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userSubscriptionId: uuid("user_subscription_id")
    .notNull()
    .references(() => userSubscriptions.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  // Billing period this payment covers
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  // Payment status
  paymentStatus: paymentStatusEnum("payment_status").default("pending"),
  // Gateway details
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }),
  razorpayInvoiceId: varchar("razorpay_invoice_id", { length: 255 }),
  // Timestamps
  paidAt: timestamp("paid_at"),
  failureReason: text("failure_reason"),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = {
  // Enums
  rentalStatusEnum,
  paymentStatusEnum,
  paymentMethodEnum,
  bookConditionEnum,
  depositTransactionTypeEnum,
  subscriptionStatusEnum,
  // Tables
  users,
  addresses,
  genres,
  authors,
  libraries,
  books,
  libraryBooks,
  rentals,
  depositTransactions,
  payments,
  wishlists,
  reviews,
  rentalTracking,
  notifications,
  subscriptionPlans,
  userSubscriptions,
  subscriptionPayments,
};
