import express from "express";
import { create } from "express-handlebars";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import flash from "express-flash";
import session from "express-session";
import authRoutes from "./routes/auth.js"; 
import varMiddleware from './middleware/authMiddleware.js' // Correct path to your route file
import userMiddleware from './middleware/userMiddleware.js' // Correct path to your route file
import cookieParser from "cookie-parser";
import hbsHelpers from "./utils/index.js";

dotenv.config();

const app = express();

// Handlebars setup
const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: hbsHelpers,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(varMiddleware);  // This will add the isAuth variable to all routes
app.use(userMiddleware);  // This will add the userId variable to all routes
// Routes
app.use("/", authRoutes);  // This will handle all the routes in auth.js

// 404 handler
app.use((req, res) => {
  console.error(`404 Error: ${req.originalUrl}`); // Log the error URL
  res.status(404).render("404", { title: "Page Not Found" });
});

const PORT = process.env.PORT || 4100;

// Start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

startServer();
