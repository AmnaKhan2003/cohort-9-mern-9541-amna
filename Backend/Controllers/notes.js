import Note from "../Models/note.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//Edit Note
export const editNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }
  try {
    const note = await Note.findOne({ _id: id, user: req.user._id });
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    note.title = title;
    note.content = content;
    await note.save();
    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//Delete Note
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// getSpecificNote
export const getSpecificNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ _id: id, user: req.user._id });
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note fetched successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//Get All Notes
export const getAllNotes = async (req, res) => {
  try {
    const id = req.user._id;
    const notes = await Note.find({ user: id });

    res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
