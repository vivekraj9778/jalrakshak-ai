const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const JWT_SECRET =
  process.env.JWT_SECRET || "jalrakshak-dev-secret";

const COOKIE_NAME = "jalrakshak_token";

// ==========================================
// COOKIE OPTIONS
// ==========================================

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

// ==========================================
// CREATE JWT
// ==========================================

const createToken = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ==========================================
// SAFE USER RESPONSE
// ==========================================

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
});

// ==========================================
// REGISTER NORMAL USER
// ==========================================

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    const passwordHash =
      await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone || "",
      passwordHash,
      role: "user",
    });

    const token = createToken(user);

    res.cookie(
      COOKIE_NAME,
      token,
      cookieOptions
    );

    res.status(201).json({
      success: true,
      message:
        "Account created successfully.",
      data: safeUser(user),
    });
  } catch (error) {
    console.error(
      "Register Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to create account.",
    });
  }
});

// ==========================================
// LOGIN
// ==========================================

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await User.findOne({
        email: normalizedEmail,
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const passwordValid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const token = createToken(user);

    res.cookie(
      COOKIE_NAME,
      token,
      cookieOptions
    );

    res.json({
      success: true,
      message: "Login successful.",
      data: safeUser(user),
    });
  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to login.",
    });
  }
});

// ==========================================
// CURRENT USER
// ==========================================

router.get("/me", async (req, res) => {
  try {
    const token =
      req.cookies?.[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
    }

    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      );

    const user =
      await User.findById(
        decoded.userId
      );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      data: safeUser(user),
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Session expired. Please login again.",
    });
  }
});

// ==========================================
// LOGOUT
// ==========================================

router.post("/logout", (req, res) => {
  res.clearCookie(
    COOKIE_NAME,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      path: "/",
    }
  );

  res.json({
    success: true,
    message: "Logged out successfully.",
  });
});

module.exports = router;