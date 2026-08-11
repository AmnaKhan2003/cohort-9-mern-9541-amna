const errorHandler = (err, req, res, next) => {
  req.log.error(
    {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.url,
    },
    "Unhandled application error",
  );
  const statusCode =
    Number.isInteger(err.statusCode) &&
    err.statusCode >= 400 &&
    err.statusCode <= 599
      ? err.statusCode
      : 500;
  res.status(statusCode).json({
    message: statusCode >= 500 ? "Internal Server Error" : err.message,
  });
};

export default errorHandler;
