import express from "express";
import { create } from "express-handlebars";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

const app = express();

// Handlebars setup
const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({extended : true}))

// Middleware for routes
app.use(authRoutes); // Routes prefixed with /auth
app.use(productRoutes); // Routes prefixed with /products

// 404 Handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
