import {Router} from "express";

const router = Router();


router.get("/", (req, res) => {
  res.render("index", {
    title: "Boom Shop | Zoyidjon",
    token : true,
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products | Zoyidjon",
    isProducts: true,
  });
});

router.get("/add", (req, res) => {
  res.render("add", {
    title: "Add Product | Zoyidjon",
    isAdd: true,
  });
});

export default router;
