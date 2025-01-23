import {Router} from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";

const router = Router();


router.get("/", async (req, res) => {
  const products = await Product.find().lien();
  req.render("index", {
    title: "Boom Shop | Zoyidjon",
    products : products.reverse(),
    userId: req.userId ? req.userId.toString : null,
  });
});

router.get("/products", async (req, res) => {
  const user = req.userId ? req.userId.toString : null;

  const myProducts = await Product.find({user}).populate("user").lean();
  res.render("products", {
    title: "Products | Zoyidjon",
    isProducts: true,
    myProducts: myProducts.reverse(),
  });
});

router.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("user").lean();
  res.render("product", {
    title: `Product | ${product.title}`,
    product : product,
  });
}

router.get("/add", authMiddleware, (req, res) => {
  res.render("add", {
    title: "Add Product | Zoyidjon",
    isAdd: true,
    errorAddProducts: req.flash("errorAddProducts"),
  });
});

router.post("/add-products", userMiddleware, async (req, res) => {
  const { title, description, image, price } = req.body;
  if (!title || !description || !image || !price) {
    req.flash("errorAddProducts", "All fields are required");
    return res.redirect("/add");
  }
  const products = await Product.create({...req.body, user: req.userId});
  res.redirect("/products");
}); 

export default router;
