const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  // Log the error to the console
  console.error(err.stack);

  const statusCode = res.statusCode ? res.statusCode : 500; // Set default to 500 if not set
  const stack = process.env.NODE_ENV === "production" ? null : err.stack; // Hide stack trace in production
  // res.status(statusCode);
  switch (statusCode) {
    case constants.HTTP_STATUS_BAD_REQUEST:
      res.json({
        title: "Bad Request",
        message: err.message,
        stack,
      });
      break;
    case constants.HTTP_STATUS_UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stack,
      });
      break;
    case constants.HTTP_STATUS_FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stack,
      });
      break;
    case constants.HTTP_STATUS_NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stack,
      });
      break;
    case constants.HTTP_STATUS_INTERNAL_SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stack,
      });
      break;
    default:
      console.log("No error, all good!");
      break;
  }
};

module.exports = errorHandler;
