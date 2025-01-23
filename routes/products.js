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

router.post("/add-products", async (req, res) => {
  const { title, description, image, price } = req.body;
  const products = await Product.create(req.body);
  res.redirect("/products");
}); 

export default router;
