import { verifyToken } from "../Authentication/auth.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
