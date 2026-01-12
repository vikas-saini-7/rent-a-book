const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv/config");

// Routes
const routes = require("./routes/index.js");

// Middlewares
const { errorHandler, notFound } = require("./middlewares/error.middleware.js");

const app = express();

app.use(morgan("dev"));

// Allowed origins from environment variables
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  process.env.LIBRARY_DASHBOARD_URL || "http://localhost:3001",
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

// Globle Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
