import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import connectDB from "./Database/db.js";

import authRoutes from "./Routes/user.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",

    credentials: true,
  }),
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.listen(
  process.env.PORT,

  () => {
    console.log(`Server running on ${process.env.PORT}`);
  },
);
