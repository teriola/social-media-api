const { body } = require('express-validator');

// Auth controller
exports.validateLogin = () => [
    body('email').trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .normalizeEmail(),
    body('password').trim()
        .notEmpty().withMessage('Password is required')
];

exports.validateRegister = () => [
    body('name').trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 12 }).withMessage('Name should be between 2 and 12 characters'),
    body('surname').trim()
        .notEmpty().withMessage('Surname is required')
        .isLength({ min: 2, max: 12 }).withMessage('Surname should be between 2 and 12 characters'),
    body('email').trim()
        .notEmpty().withMessage('Email is required')
        .isLength({ max: 30 }).withMessage('Email is too long')
        .isEmail().withMessage('Email is invalid')
        .normalizeEmail(),
    body('password').trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 18 }).withMessage('Password must be between 6 and 18 characters'),
    body('rePassword').trim()
        .custom((value, { req }) => value === req.body.password).withMessage('Passwords don\'t match'),
];

/*
// Post controller
exports.validateReview = () => [
    body('title').trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 2 }).withMessage('Title should be at least 2 characters'),
    body('author').trim()
        .notEmpty().withMessage('Author is required')
        .isLength({ min: 5 }).withMessage('Author should be at least 5 characters'),
    body('genre').trim()
        .notEmpty().withMessage('Genre is required')
        .isLength({ min: 5 }).withMessage('Genre should be at least 5 characters'),
    body('stars').trim()
        .notEmpty().withMessage('Stars are required')
        .isNumeric({ min: 1, max: 5 }).withMessage('Stars must be a number between 1 and 5'),
    body('image').trim()
        .notEmpty().withMessage('Image is required')
        .matches(/^https?:\/\/.*$/).withMessage('Invalid image url'),
    body('review')
        .notEmpty().withMessage('Review is required')
        .isLength({ min: 10 }).withMessage('Review should be at least 10 characters'),
];
*/
