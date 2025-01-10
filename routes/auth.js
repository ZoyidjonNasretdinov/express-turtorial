import express from "express";
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

export default router;
