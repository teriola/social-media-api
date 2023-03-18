const router = require("express").Router();

const userControler = require('./controlers/userControler');
// const postControler = require('./controlers/postControler');

// User
router.use('/users', userControler);
// Posts
// router.use('/posts', postControler);

module.exports = router;
