import express from "express";
import { create } from "express-handlebars";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import flash from "express-flash";
import session from "express-session";
import authRoutes from "./routes/auth.js";

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

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "Zoyidjon",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Routes
app.use(authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found");
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
