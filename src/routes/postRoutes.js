const router = require('express').Router();
const { getPosts, setPost, updatePost, deletePost, getUserPosts, getPost } = require('../controlers/postControler');
const protect = require('../middlewares/authMiddleware');

router.route('/').get(getPosts).post(protect, setPost);
router.route('/:id').get(getPost).put(protect, updatePost).delete(protect, deletePost);
router.get('/user/:userId', getUserPosts);

module.exports = router;
