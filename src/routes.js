const router = require('express').Router();

const authController = require('./controllers/authController');
// const userController = require('./controllers/userController');
// const postController = require('./controllers/postController');

router.use('/auth', authController);
// router.use('/users', userController);
// router.use('/posts', postController);

module.exports = router;
