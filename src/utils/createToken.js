const jwt = require('./jwt');
const { SECRET } = require('../config/constants');

exports.createToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
    };
    const token = await jwt.sign(payload, SECRET);
    return token;
}
