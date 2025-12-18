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

  res.cookie("libraryAccessToken", accessToken, cookieOptions);
  res.cookie("libraryRefreshToken", refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Library login successful",
    data: { library: safeLibrary, accessToken, refreshToken },
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
    data: { accessToken, refreshToken },
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
