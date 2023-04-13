const { NODE_ENV } = require("../config/constants");

const errorHandler = (err, req, res, next) => {
  console.log(err.status);
  const statusCode = err.status ? err.status : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
