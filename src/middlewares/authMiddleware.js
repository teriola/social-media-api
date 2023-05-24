const { SECRET } = require("../config");
const jwt = require('../utils/jwt');

exports.auth = async function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        //Veryfy token
        jwt.verify(token, SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                next();
            })
            .catch(err => {
                res.status(401).json({ message: 'Unauthorized' });
            });
    } else {
        next();
    }
}
