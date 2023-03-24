const util = require('util');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const jwt = {
  sign: util.promisify(jsonwebtoken.sign),
  virify: util.promisify(jsonwebtoken.verify),
};

exports.signToken = async ({ _id, email, firstName, lastName }) => {
  return jwt.sign({ _id, email, firstName, lastName }, config.SECRET, { expiresIn: '24h' });
};

exports.verifyToken = async (headers) => {
  const token = headers['x-auth'];
  if (!token) {
    sendError('Not authorized', 401);
  }
  const decodedUser = await jwt.verify(token, config.SECRET);
  const user = await User.findById(decodedUser._id);
  if (!user) {
    sendError('Not authorized', 401);
  }
  return user;
};

exports.createPayload = (user, token) => {
  const { _id, email, firstName, lastName, profilePicture, coverPicture, } = user;
  return {
    _id,
    email,
    firstName,
    lastName,
    profilePicture,
    coverPicture,
    accessToken: token,
  };
};