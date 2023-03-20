const router = require("express").Router();

const userControler = require('./controlers/userControler');
const postControler = require('./controlers/postControler');

router.use('/users', userControler);
router.use('/posts', postControler);

module.exports = router;
