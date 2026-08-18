import { expect } from "chai";
import User from "../Models/user.js";
import bcrypt from "bcrypt";
import { signup, login } from "../Controllers/user.js";

describe("Auth Controller Tests", () => {
  const createReq = (body) => ({
    body,
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

    cookie() {},
  });
  const next = () => {};

  describe("Signup", () => {
    it("should return 400 if required fields are missing", async () => {
      const req = createReq({
        name: "",
        email: "",
        password: "",
      });
      const res = createRes();
      await signup(req, res, next);
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("All fields are required");
    });

    it("should return 400 if password is less than 6 characters", async () => {
      const req = createReq({
        name: "Nadeem",
        email: "nadeem@gmail.com",
        password: "123",
      });
      const res = createRes();
      await signup(req, res, next);
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal(
        "Password must be at least 6 characters",
      );
    });

    it("should return 409 if user already exists", async () => {
      const originalFindOne = User.findOne;
      User.findOne = async () => ({
        _id: "123",
        name: "Existing User",
        email: "nadeem@gmail.com",
      });
      const req = createReq({
        name: "Nadeem",
        email: "nadeem@gmail.com",
        password: "123456",
      });
      const res = createRes();
      await signup(req, res, next);
      expect(res.statusCode).to.equal(409);
      expect(res.body.message).to.equal("Registration failed.");
      User.findOne = originalFindOne;
    });
  });

  describe("Login", () => {
    it("should return 400 if email or password is missing", async () => {
      const req = createReq({
        email: "",
        password: "",
      });
      const res = createRes();
      await login(req, res, next);
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Email and password are required");
    });

    it("should return 404 if user does not exist", async () => {
      const originalFindOne = User.findOne;
      User.findOne = async () => null;
      const req = createReq({
        email: "notfound@gmail.com",
        password: "123456",
      });
      const res = createRes();
      await login(req, res, next);
      expect(res.statusCode).to.equal(404);
      expect(res.body.message).to.equal("Invalid email or password");
      User.findOne = originalFindOne;
    });

    it("should return 401 if password is incorrect", async () => {
      const originalFindOne = User.findOne;
      const originalCompare = bcrypt.compare;
      User.findOne = async () => ({
        _id: "123",
        email: "nadeem@gmail.com",
        password: "hashedPassword",
      });
      bcrypt.compare = async () => false;
      const req = createReq({
        email: "nadeem@gmail.com",
        password: "wrongpassword",
      });
      const res = createRes();
      await login(req, res, next);
      expect(res.statusCode).to.equal(401);
      expect(res.body.message).to.equal("Invalid email or password");
      User.findOne = originalFindOne;
      bcrypt.compare = originalCompare;
    });
  });
});
