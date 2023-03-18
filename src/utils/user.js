const util = require('util');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');

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
<<<<<<< HEAD:src/utils/auth.js
=======

exports.verifyToken = (data) => {

};
>>>>>>> a65fda7 (fix errors and add error handling):src/utils/user.js
