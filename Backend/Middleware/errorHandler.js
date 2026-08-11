import logger from "./logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(
    {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.url,
    },
    "Unhandled application error",
  );

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
