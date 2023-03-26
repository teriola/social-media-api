const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { decodeToken } = require("../utils/jwt");

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log()

  if (authorization) {
    try {
      // Verify token
      const decoded = await decodeToken(authorization);

      // Get user and set it
      req.user = await User.findById(decoded._id).select('-password');

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized')
    }
  } else{
    res.status(401);
    throw new Error('Not authorized, no token')
  }
});
module.exports = protect;
