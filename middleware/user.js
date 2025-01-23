import jwt from "jsonwebtoken";
import User from "../models/User";

export default async function (req, res, next) {
  if (!req.cookies.token) {
    req.redirect("/login");
    return
  }


  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  req.userId = user._id;
  next()
}