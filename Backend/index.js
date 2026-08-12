import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Database/db.js";
import authRoutes from "./Routes/user.js";
import notesRoutes from "./Routes/notes.js";
import pinoHttp from "pino-http";
import logger from "./Middleware/logger.js";
import errorHandler from "./Middleware/errorHandler.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(
  pinoHttp({
    logger,
    redact: [
      "req.headers.cookie",
      "req.headers.authorization",
      "res.headers.set-cookie",
    ],
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
  });
};

startServer();
