const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../services/auth.service.js");

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

/**
 * Register a new user
 */
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const { user, accessToken, refreshToken } = await registerUser({
    name,
    email,
    password,
  });

  const { password: _, ...safeUser } = user;

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: { user: safeUser, accessToken, refreshToken },
  });
};

/**
 * Login a user
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginUser({
    email,
    password,
  });

  const { password: _, ...safeUser } = user;

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user: safeUser, accessToken, refreshToken },
  });
};

/**
 * Refresh access token
 */
exports.refresh = async (req, res, next) => {
  const token = req.cookies["refreshToken"];

  const { accessToken: newAccessToken } = await refreshAccessToken({
    refreshToken: token,
  });

  res.cookie("accessToken", newAccessToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: { accessToken: newAccessToken },
  });
};

/**
 * Logout a user
 */
exports.logout = async (req, res, next) => {
  logoutUser();

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
