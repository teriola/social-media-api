const router = require('express').Router();
const { getPosts, setPost, updatePost, deletePost, getUserPosts, getPost, getUserBookmarks, setUserBookmark } = require('../controlers/postControler');
const protect = require('../middlewares/authMiddleware');

router.route('/').get(getPosts).post(protect, setPost);
router.route('/bookmarks').get(protect, getUserBookmarks).post(protect, setUserBookmark);
router.get('/user/:userId', getUserPosts);
router.route('/:id').get(getPost).put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
