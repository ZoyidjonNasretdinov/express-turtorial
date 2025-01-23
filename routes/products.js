import {Router} from "express";

const router = Router();


router.get("/", (req, res) => {
  req.render("index", {
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

router.post("/add-products", (req, res) => {
  res.redirect("/products");
}); 

export default router;
