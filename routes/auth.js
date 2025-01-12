import express from "express";
import User from "../models/User.js";
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
  const userData = {
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  }

  const user = await new User(userData)
  console.log(user);
  
  res.redirect('/')
})

export default router;
