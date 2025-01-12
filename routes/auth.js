import express from "express";
import User from "../models/User.js";

import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Login", isLogin: true });
});


router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    isRegister: true,
  });
});

router.post('/login', (req, res) => {
  console.log(req.body);
  res.redirect('/')
})

router.post('/register', async (req, res) => {

  const hashPassword = await bcrypt.hash(req.body.password, 10)

  const userData = {
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
  }

  const user = await new User(userData)
  console.log(user);
  
  res.redirect('/')
})

export default router;
