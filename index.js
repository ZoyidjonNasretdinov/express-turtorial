// Import express
import express from "express";
import { create } from "express-handlebars";

// Import dotenv
import * as dotenv from "dotenv";

// Import mongoose
import mongoose from "mongoose";

// Import routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

// Handlebars setup
const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Middleware for routes
app.use(authRoutes); // Routes prefixed with /auth
app.use(productRoutes); // Routes prefixed with /products

// 404 Handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 4100;

const startServer = async () => {
  try {
    // Minimalist va to'g'ri MongoDB ulanish
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Serverni ishga tushirish
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Ulanish muvaffaqiyatsiz bo'lsa, serverni to'xtatadi
  }
};

startServer();
