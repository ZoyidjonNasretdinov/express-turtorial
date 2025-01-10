import express from "express";
import { create } from "express-handlebars";
import authRoutes from "./routes/auth.js"; // Import auth routes
import productRoutes from "./routes/products.js"; // Import product routes

const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

// Configure handlebars
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// Middleware for routes
app.use("/auth", authRoutes); // Use auth routes with prefix /auth
app.use("/products", productRoutes); // Use product routes with prefix /products

// Start the server
const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
