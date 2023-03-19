const errorParser = (err) => {
  if (err.name == "ValidationError") {
    err.message = Object.values(err.errors)[0].message;
    err.code = 400;
  } else if (err.code == "11000") {
    err.message = `${err.keyPattern.name ? "School" : "User"} already exists`;
    err.code = 409;
  }
  return err;
};

const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  const error = errorParser(err);
  res.status(error.code || 500).json({ message: error.message });
};

module.exports = globalErrorHandler;
