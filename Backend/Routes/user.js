import express from "express";

import { signup, login, userProfile } from "../Controllers/user.js";

import { authMiddleware } from "../Middleware/middleware.js";

const router = express.Router();

router.get("/verify", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the authentication API", data: req.user });
});

router.post("/signup", signup);

router.post("/login", login);

router.get("/user", authMiddleware, userProfile);

router.post("/logout", authMiddleware, (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

export default router;
