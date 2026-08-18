import { expect } from "chai";
import Note from "../Models/notes.js";
import {
  createNote,
  editNote,
  deleteNote,
  getSpecificNote,
  getAllNotes,
} from "../Controllers/notes.js";

describe("Notes Controller Tests", () => {
  const createReq = (body = {}, params = {}) => ({
    body,
    params,
    user: {
      _id: "123456789012345678901234",
    },
    log: {
      warn: () => {},
      info: () => {},
    },
  });

  const createRes = () => ({
    statusCode: 200,
    body: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    json(data) {
      this.body = data;
      return this;
    },
  });

  const next = () => {};

  describe("Create Note", () => {
    it("should return 400 if title or content is missing", async () => {
      const req = createReq({
        title: "",
        content: "",
      });
      const res = createRes();

      try {
        await createNote(req, res, next);
      } catch (error) {
        throw error;
      }

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Title and content are required");
    });

    it("should create a note successfully", async () => {
      const originalCreate = Note.create;

      try {
        Note.create = async () => ({
          _id: "123",
          title: "Test Note",
          content: "Test Content",
          user: "123456789012345678901234",
        });

        const req = createReq({
          title: "Test Note",
          content: "Test Content",
        });
        const res = createRes();

        try {
          await createNote(req, res, next);
        } catch (error) {
          throw error;
        }

        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal("Note created successfully");
      } finally {
        Note.create = originalCreate;
      }
    });
  });

  describe("Edit Note", () => {
    it("should return 400 for invalid note ID", async () => {
      const req = createReq(
        {
          title: "Updated Note",
          content: "Updated Content",
        },
        {
          id: "invalid-id",
        },
      );
      const res = createRes();

      try {
        await editNote(req, res, next);
      } catch (error) {
        throw error;
      }

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Invalid note ID");
    });
  });

  describe("Delete Note", () => {
    it("should return 400 for invalid note ID", async () => {
      const req = createReq(
        {},
        {
          id: "invalid-id",
        },
      );
      const res = createRes();

      try {
        await deleteNote(req, res, next);
      } catch (error) {
        throw error;
      }

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Invalid note ID");
    });
  });

  describe("Get Specific Note", () => {
    it("should return 400 for invalid note ID", async () => {
      const req = createReq(
        {},
        {
          id: "invalid-id",
        },
      );
      const res = createRes();

      try {
        await getSpecificNote(req, res, next);
      } catch (error) {
        throw error;
      }

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Invalid note ID");
    });
  });

  describe("Get All Notes", () => {
    it("should return notes successfully", async () => {
      const originalFind = Note.find;

      try {
        Note.find = async () => [
          {
            _id: "123",
            title: "Test Note",
            content: "Test Content",
            user: "123456789012345678901234",
          },
        ];

        const req = createReq();
        const res = createRes();

        try {
          await getAllNotes(req, res, next);
        } catch (error) {
          throw error;
        }

        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal("Notes fetched successfully");
        expect(res.body.notes).to.be.an("array");
      } finally {
        Note.find = originalFind;
      }
    });
  });
});
