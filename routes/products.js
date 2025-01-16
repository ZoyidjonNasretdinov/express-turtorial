import express from "express";

const router = express.Router();


router.get("/", (req, res) => {
  res.render("index", {
    title: "Boom Shop",
    token : false,
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products",
    isProducts: true,
  });
});

router.get("/add", (req, res) => {
  res.render("add", {
    title: "Add Product",
    isAdd: true,
  });
});

export default router;
