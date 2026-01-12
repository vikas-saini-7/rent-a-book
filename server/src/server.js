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

// Trust proxy - CRITICAL for cookies to work in production behind reverse proxy
// This allows Express to read the X-Forwarded-* headers set by proxies/load balancers
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(morgan("dev"));

// Allowed origins from environment variables
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  process.env.LIBRARY_DASHBOARD_URL || "http://localhost:3001",
];

console.log("🔒 Allowed CORS Origins:", allowedOrigins);

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.error(`❌ CORS Error: Origin "${origin}" is not allowed`);
        console.error(`✅ Allowed origins:`, allowedOrigins);
        callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
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
