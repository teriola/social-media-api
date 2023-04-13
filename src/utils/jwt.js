const { promisify } = require('util');
const { sign, verify } = require('jsonwebtoken');

exports.sign = promisify(sign);
exports.verify = promisify(verify);
