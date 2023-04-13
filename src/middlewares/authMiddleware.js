const { TOKEN_NAME, SECRET } = require("../config/constants");
const jwt = require("../utils/jwt");

exports.auth = async function (req, res, next) {
    const token = req.headers[TOKEN_NAME];

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

exports.isAuth = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}



































// exports.isGuest = function (req, res, next) {
//     if (!req.user) {
//         next();
//     } else {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// }

// exports.isOwner = async function (req, res, next) {
//     const book = await getReviewById(req.params.id);
//
//     if (book.owner == req.user._id) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// }

// exports.isNotOwner = async function (req, res, next) {
//     const book = await getReviewById(req.params.id);
//
//     if (book.owner != req.user._id) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// }
