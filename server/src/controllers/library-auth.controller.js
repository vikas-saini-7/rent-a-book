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
  path: "/",
  ...(process.env.NODE_ENV === "production" &&
    process.env.COOKIE_DOMAIN && {
      domain: process.env.COOKIE_DOMAIN,
    }),
};

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

  res.cookie("libraryAccessToken", accessToken, cookieOptions);
  res.cookie("libraryRefreshToken", refreshToken, cookieOptions);

  res.status(201).json({
    success: true,
    message: "Library registration successful",
    data: { library: safeLibrary },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const { library, accessToken, refreshToken } = await loginLibrary({
    email,
    password,
  });

  const { password: _, ...safeLibrary } = library;

  res.cookie("libraryAccessToken", accessToken, cookieOptions);
  res.cookie("libraryRefreshToken", refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Library login successful",
    data: { library: safeLibrary },
  });
};

exports.refresh = async (req, res, next) => {
  const token = req.cookies["libraryRefreshToken"];

  const { accessToken, refreshToken } = await refreshLibraryToken(token);

  res.cookie("libraryAccessToken", accessToken, cookieOptions);
  res.cookie("libraryRefreshToken", refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
  });
};

exports.logout = async (req, res, next) => {
  const token = req.cookies["libraryRefreshToken"];

  await logoutLibrary(token);

  res.clearCookie("libraryAccessToken", cookieOptions);
  res.clearCookie("libraryRefreshToken", cookieOptions);

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

/**
 * Get current authenticated library
 */
exports.me = async (req, res, next) => {
  // Library is attached by authenticateLibrary middleware
  const libraryId = req.library.id;

  // Get full library data from database
  const { db } = require("../db/index.js");
  const { libraries } = require("../db/schema.js");
  const { eq } = require("drizzle-orm");

  const [library] = await db
    .select()
    .from(libraries)
    .where(eq(libraries.id, libraryId));

  if (!library) {
    const { AppError } = require("../middlewares/error.middleware.js");
    throw new AppError("Library not found", 404);
  }

  const { password: _, ...safeLibrary } = library;

  res.status(200).json({
    success: true,
    data: { library: safeLibrary },
  });
};
