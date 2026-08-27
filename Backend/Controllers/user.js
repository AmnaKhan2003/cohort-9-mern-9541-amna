import User from "../Models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Authentication/auth.js";
import dotenv from "dotenv";
dotenv.config();

// Signup

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      req.log.warn("Signup failed: required fields missing");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      req.log.warn("Signup failed: password too short");
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      req.log.warn("Registration attempt with existing email");
      return res.status(409).json({
        message: "Registration failed.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    req.log.info("User registered successfully");
    res.status(201).json({
      message: "Signup successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      req.log.warn("Registration attempt with existing email");
      return res.status(409).json({
        message: "Registration failed.",
      });
    }
    next(error);
  }
};

// Login

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.log.warn("Login failed: email or password missing");
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      req.log.warn("Login failed: user not found");
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.log.warn("Login failed: incorrect password");
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT Token

    const token = generateToken(user._id, user.email);

    // Return token in response

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    req.log.info("User logged in successfully");
    res.json({
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      req.log.warn("Profile not found for user");
      return res.status(404).json({
        message: "User not found",
      });
    }
    req.log.info("User profile fetched successfully");
    res.status(200).json({
      message: "User profile fetched successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
