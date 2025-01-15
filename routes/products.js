import express from "express";
import path from "path";
import { create } from "express-handlebars";

const router = express.Router();

// Set up view engine
const hbs = create({
  defaultLayout: "main", // Ensure you have a "main.hbs" layout file, or set it to null if not
  extname: "hbs", // Using Handlebars as the view engine
});

router.engine("hbs", hbs.engine);
router.set("view engine", "hbs");
router.set("views", path.join(__dirname, "views"));  // Ensure the views directory is correctly set

// Define routes
router.get("/", (req, res) => {
  res.render("index", {
    title: "Boom Shop",
    isProducts: true,
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
