import express from "express";

import {
  createNote,
  editNote,
  deleteNote,
  getSpecificNote,
  getAllNotes,
} from "../Controllers/user.js";

import { authMiddleware } from "../Middleware/middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createNote);

router.put("/edit/:id", authMiddleware, editNote);

router.delete("/delete/:id", authMiddleware, deleteNote);

router.get("/specificNote/:id", authMiddleware, getSpecificNote);

router.get("/allNotes", authMiddleware, getAllNotes);

export default router;
