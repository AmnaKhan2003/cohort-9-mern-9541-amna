import Note from "../Models/notes.js";
import mongoose from "mongoose";
// Create Note
export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    console.log("Request body:", req.body);

    if (!title || !content) {
      req.log.warn("Create note failed: title or content missing");
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });
    req.log.info(`Note created successfully for user: ${req.user._id}`);
    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

//Edit Note
export const editNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid note ID",
    });
  }
  if (!title || !content) {
    req.log.warn("Edit note failed: title or content missing");
    return res.status(400).json({
      message: "Title and content are required",
    });
  }
  try {
    const note = await Note.findOne({ _id: id, user: req.user._id });
    if (!note) {
      req.log.warn(
        `Edit note failed: note not found for user ${req.user._id} and note ID ${id}`,
      );
      return res.status(404).json({
        message: "Note not found",
      });
    }
    note.title = title;
    note.content = content;
    await note.save();
    req.log.info(
      `Note updated successfully for user: ${req.user._id} and note ID: ${id}`,
    );
    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Note
export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid note ID",
    });
  }
  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });
    if (!note) {
      req.log.warn(
        `Delete note failed: note not found for user ${req.user._id} and note ID ${id}`,
      );
      return res.status(404).json({
        message: "Note not found",
      });
    }
    req.log.info(
      `Note deleted successfully for user: ${req.user._id} and note ID: ${id}`,
    );
    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// getSpecificNote
export const getSpecificNote = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid note ID",
    });
  }
  try {
    const note = await Note.findOne({ _id: id, user: req.user._id });
    if (!note) {
      req.log.warn(
        `Get specific note failed: note not found for user ${req.user._id} and note ID ${id}`,
      );
      return res.status(404).json({
        message: "Note not found",
      });
    }
    req.log.info(
      `Specific note fetched successfully for user: ${req.user._id} and note ID: ${id}`,
    );
    res.status(200).json({
      message: "Note fetched successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

//Get All Notes
export const getAllNotes = async (req, res, next) => {
  try {
    const id = req.user._id;
    const notes = await Note.find({ user: id });
    req.log.info(`All notes fetched successfully for user: ${id}`);
    res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (error) {
    next(error);
  }
};
