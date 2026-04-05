require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { errorHandler } = require("./middleware/errorHandler");

// Initialize WhatsApp client
require("./whatsapp");

const app = express();

// Security & Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: { error: "Too many requests, please try again later." },
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many auth attempts." },
});

app.use("/api", limiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Health Check
app.get("/health", (req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() }),
);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/pandits", require("./routes/pandits"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/live-pooja", require("./routes/livePooja"));
app.use("/api/shop", require("./routes/shop"));
app.use("/api/temples", require("./routes/temples"));
app.use("/api/astrology", require("./routes/astrology"));
app.use("/api/panchang", require("./routes/panchang"));
app.use("/api/vedapatashala", require("./routes/vedapatashala"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/admin", require("./routes/admin"));

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Venixa API running on port ${PORT} [${process.env.NODE_ENV}]`,
  );
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please stop the existing process or change PORT.`,
    );
    process.exit(1);
  }
  console.error("Server error:", err);
  process.exit(1);
});

module.exports = app;
