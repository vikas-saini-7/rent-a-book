const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv/config");

// Routes
const routes = require("./routes/index.js");

// Middlewares
const { errorHandler, notFound } = require("./middlewares/error.middleware.js");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running smoothly!");
});

// API Routes
app.use("/api", routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
