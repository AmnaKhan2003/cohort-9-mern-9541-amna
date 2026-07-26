import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined.");
}

if (!process.env.JWT_EXPIRE) {
  throw new Error("JWT_EXPIRE is not defined.");
}

export const generateToken = (userId, email) => {
  return jwt.sign(
    {
      userId,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
