const config = require("../config");

const errorHandler = (err, req, res, next) => {
  console.log(err.status);
  const statusCode = err.status ? err.status : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: config.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;