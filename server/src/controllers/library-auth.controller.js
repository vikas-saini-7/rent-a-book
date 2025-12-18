const {
  registerLibrary,
  loginLibrary,
  refreshLibraryToken,
  logoutLibrary,
} = require("../services/library-auth.service.js");

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

// const libraries = pgTable("libraries", {
//   id: serial("id").primaryKey(),
//   // Login credentials
//   email: varchar("email", { length: 255 }).notNull().unique(),
//   password: text("password").notNull(),
//   // Library details
//   name: varchar("name", { length: 255 }).notNull(),
//   slug: varchar("slug", { length: 255 }).notNull().unique(),
//   description: text("description"),
//   imageUrl: text("image_url"),
//   // Location details
//   addressLine1: text("address_line_1").notNull(),
//   addressLine2: text("address_line_2"),
//   city: varchar("city", { length: 100 }).notNull(),
//   state: varchar("state", { length: 100 }).notNull(),
//   postalCode: varchar("postal_code", { length: 20 }).notNull(),
//   country: varchar("country", { length: 100 }).default("India"),
//   // Contact
//   phone: varchar("phone", { length: 20 }),
//   // Operating hours (can be JSON or separate fields)
//   operatingHours: text("operating_hours"), // JSON string
//   isActive: boolean("is_active").default(true),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });

exports.register = async (req, res, next) => {
  const {
    name,
    email,
    password,
    description,
    imageUrl,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    phone,
    operatingHours,
  } = req.body;

  const { library, accessToken, refreshToken } = await registerLibrary({
    name,
    email,
    password,
    description,
    imageUrl,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    phone,
    operatingHours,
  });

  const { password: _, ...safeLibrary } = library;

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.status(201).json({
    success: true,
    message: "Library registration successful",
    data: { library: safeLibrary, accessToken, refreshToken },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const { library, accessToken, refreshToken } = await loginLibrary({
    email,
    password,
  });

  const { password: _, ...safeLibrary } = library;

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Library login successful",
    data: { library: safeLibrary, accessToken, refreshToken },
  });
};

exports.refresh = async (req, res, next) => {
  const token = req.cookies["refreshToken"];

  const { accessToken, refreshToken } = await refreshLibraryToken(token);

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: { accessToken, refreshToken },
  });
};

exports.logout = async (req, res, next) => {
  const token = req.cookies["refreshToken"];

  await logoutLibrary(token);

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
