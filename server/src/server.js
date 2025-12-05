const express = require("express");
const cors = require("cors");
require("dotenv/config");

// Routes
const routes = require("./routes/index.js");

// Middlewares
const { errorHandler, notFound } = require("./middlewares/error.middleware.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running smoothly!");
});

// API Routes
app.use("/api", routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
