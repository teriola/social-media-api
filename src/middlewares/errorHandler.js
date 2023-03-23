const config = require("../config");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.status ? res.status : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: config.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  globalErrorHandler: errorHandler
};
