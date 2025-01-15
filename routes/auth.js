// routes/authRoutes.js
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateAuthToken } from "../services/token.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Render login page
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    isLogin: true,
    loginError: req.flash("loginError"),
  });
});

// Render register page
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    isRegister: true,
    registerError: req.flash("registerError"),
  });
});

// Handle login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("loginError", "All fields are required");
    return res.redirect("/login");
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      req.flash("loginError", "Invalid email or password");
      return res.redirect("/login");
    }

    // Generate token and send it as a cookie
    const token = generateAuthToken(user._id);
    res.cookie("auth_token", token, {
      httpOnly: true, // Cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Only send secure cookies in production
      maxAge: 3600000, // 1 hour expiry time
    });

    req.flash("success", "Login successful");
    res.redirect("/"); // Redirect to home page after login
  } catch (err) {
    console.error(err.message);
    req.flash("loginError", "Something went wrong");
    res.redirect("/login");
  }
});

// Handle registration
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    req.flash("registerError", "All fields are required");
    return res.redirect("/register");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("registerError", "Email is already registered");
      return res.redirect("/register");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate token after successful registration
    const token = generateAuthToken(user._id);

    // Send the token in a cookie
    res.cookie("auth_token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour expiry time
    });

    req.flash("success", "Registration successful");
    res.redirect("/login"); // Redirect to login page after successful registration
  } catch (err) {
    console.error(err.message);
    req.flash("registerError", "Something went wrong");
    res.redirect("/register");
  }
});

// Protecting a route that requires authentication
router.get("/profile", authMiddleware, (req, res) => {
  res.render("profile", { userId: req.userId });
});

export default router;
