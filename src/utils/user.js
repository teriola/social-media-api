const util = require('util');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');
const { sendError } = require('./sendError');
const User = require('../models/User');

const jwt = {
  sign: util.promisify(jsonwebtoken.sign),
  virify: util.promisify(jsonwebtoken.verify),
};

exports.signToken = async (data) => {
  const payload = {
    _id: data._id,
  };
  return jwt.sign(payload, config.SECRET, { expiresIn: '24h' });
};

exports.verifyToken = async (headers) => {
  const token = headers['x-auth'];
  if(!token){
    sendError('Not authorized', 401);
  }
  const decodedUser = await jwt.verify(token, config.SECRET);
  const user = await User.findById(decodedUser._id);
  if(!user){
    sendError('Not authorized', 401);
  }
  return user;
};
