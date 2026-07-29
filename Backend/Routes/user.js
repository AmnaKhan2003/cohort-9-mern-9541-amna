import express from "express";

import { signup, login } from "../Controllers/user.js";

import { authMiddleware } from "../Middleware/middleware.js";

const router = express.Router();

router.get("/verify", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the authentication API", data: req.user });
});

router.post("/signup", signup);

router.post("/login", login);

export default router;
