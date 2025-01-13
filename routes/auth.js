import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Render login page
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    isLogin: true,
    loginError: req.flash('loginError'),
  });
});

// Render register page
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    isRegister: true,
    registerError: req.flash('registerError'),
  });
});

// Handle login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    req.flash("loginError", "All fields are required");
    return res.redirect("/login");
  }

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      req.flash("loginError", "Invalid email or password");
      return res.redirect("/login");
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      req.flash("loginError", "Invalid email or password");
      return res.redirect("/login");
    }

    // Login success
    console.log("Login successful");
    res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error.message);
    req.flash("loginError", "Something went wrong, please try again");
    res.redirect("/login");
  }
});

// Handle registration
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate input fields
  if (!firstName || !lastName || !email || !password) {
    req.flash("registerError", "All fields are required");
    return res.redirect("/register");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists");
      req.flash("registerError", "Email is already in use");
      return res.redirect("/register");
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();

    console.log("User registered successfully");
    res.redirect("/login");
  } catch (error) {
    console.error("Error during registration:", error.message);
    req.flash("registerError", "Something went wrong, please try again");
    res.redirect("/register");
  }
});

export default router;
