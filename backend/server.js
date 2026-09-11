const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// ==========================================
// LOAD ENVIRONMENT VARIABLES
// ==========================================

dotenv.config();

const app = express();

// ==========================================
// CONNECT MONGODB
// ==========================================

connectDB();

// ==========================================
// CORS CONFIGURATION
// ==========================================

// Frontend URLs allowed to access backend
const allowedOrigins = [
  // Localhost
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",

  // Network / LAN
  "http://10.155.172.105:5173",
  "http://10.155.172.105:5174",
  "http://10.155.172.105:5175",
];

// Add FRONTEND_URL from .env if available
if (process.env.FRONTEND_URL) {
  const frontendUrl = process.env.FRONTEND_URL
    .trim()
    .replace(/\/$/, "");

  if (
    frontendUrl &&
    !allowedOrigins.includes(frontendUrl)
  ) {
    allowedOrigins.push(frontendUrl);
  }
}

console.log("=================================");
console.log("CORS CONFIGURATION");
console.log("=================================");
console.log("Allowed CORS Origins:");
console.log(allowedOrigins);
console.log("=================================");

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin header
      // Example: Postman, curl, server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked:", origin);

      return callback(
        new Error(`CORS blocked: ${origin}`)
      );
    },

    credentials: true,
  })
);

// ==========================================
// COOKIE PARSER
// ==========================================

app.use(cookieParser());

// ==========================================
// BODY PARSERS
// ==========================================

// SOS photos are compressed and sent as Base64
app.use(
  express.json({
    limit: "25mb",
  })
);

// URL encoded requests
app.use(
  express.urlencoded({
    extended: true,
    limit: "25mb",
  })
);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "JalRakshak AI Backend is running 🚀",
  });
});

// ==========================================
// API ROUTES
// ==========================================

// Authentication
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// Emergency / SOS
app.use(
  "/api/emergencies",
  require("./routes/emergencyRoutes")
);

// Resources
app.use(
  "/api/resources",
  require("./routes/resourceRoutes")
);

// Dashboard
app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

// Notifications
app.use(
  "/api/notifications",
  require("./routes/notificationRoutes")
);

// Relief Centers
app.use(
  "/api/relief-centers",
  require("./routes/reliefCenterRoutes")
);

// Profile
app.use(
  "/api/profile",
  require("./routes/profileRoutes")
);

// ==========================================
// JSON / REQUEST ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("=================================");
  console.error("BACKEND ERROR");
  console.error("=================================");
  console.error("Error Name:", err.name);
  console.error("Error Message:", err.message);
  console.error("Error Code:", err.code);
  console.error("Error Type:", err.type);
  console.error("=================================");

  // ==========================================
  // REQUEST TOO LARGE
  // ==========================================

  if (
    err.type === "entity.too.large" ||
    err.status === 413
  ) {
    return res.status(413).json({
      success: false,
      message:
        "Uploaded photo is too large. Please choose a smaller image.",
    });
  }

  // ==========================================
  // INVALID JSON
  // ==========================================

  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    err.type === "entity.parse.failed"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data.",
    });
  }

  // ==========================================
  // CORS ERROR
  // ==========================================

  if (
    err.message &&
    err.message.startsWith("CORS blocked:")
  ) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }

  // ==========================================
  // GENERAL ERROR
  // ==========================================

  return res.status(500).json({
    success: false,
    message:
      err.message || "Internal server error",
  });
});

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("JalRakshak AI Backend");
  console.log("=================================");
  console.log(
    `Server running on http://localhost:${PORT}`
  );
  console.log(
    `Network: http://10.155.172.105:${PORT}`
  );
  console.log("MongoDB connection initialized");
  console.log("JSON upload limit: 25MB");
  console.log("CORS enabled");
  console.log("=================================");
});