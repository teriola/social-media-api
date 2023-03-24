const util = require('util');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');

const jwt = {
  sign: util.promisify(jsonwebtoken.sign),
  verify: util.promisify(jsonwebtoken.verify),
};

exports.signToken = async (_id) => {
  return await jwt.sign({ _id }, config.SECRET, {
    expiresIn: '30d',
  });
};

exports.decodeToken = async (token) => {
  const decodedUser = await jwt.verify(token, config.SECRET);
  return decodedUser;
};

// exports.createPayload = (user, token) => {
//   const { _id, email, firstName, lastName, profilePicture, coverPicture, } = user;
//   return {
//     _id,
//     email,
//     firstName,
//     lastName,
//     profilePicture,
//     coverPicture,
//     accessToken: token,
//   };
// };
