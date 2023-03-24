const router = require('express').Router();
const { getPosts, setPost, updatePost, deletePost } = require('../controlers/postControler');
const protect = require('../middlewares/authMiddleware');

router.route('/').get(getPosts).post(protect, setPost);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
