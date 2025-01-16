import jwt from "jsonwebtoken";

export function generateAuthToken(userId) {
  const secretKey = process.env.JWT_SECRET || "default_secret_key";
  return jwt.sign({ id: userId }, secretKey, { expiresIn: "1h" });
}
