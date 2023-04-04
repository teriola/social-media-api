const router = require('express').Router();
const { getPosts, setPost, updatePost, deletePost, getUserPosts, getPost, getUserBookmarks, setUserBookmark, likePost, removeLikePost, removeUserBookmark, getPostComments, commentPost } = require('../controlers/postControler');
const protect = require('../middlewares/authMiddleware');

router.route('/').get(getPosts).post(protect, setPost);
router.route('/bookmarks').get(protect, getUserBookmarks).post(protect, setUserBookmark).delete(protect, removeUserBookmark);
router.get('/user/:userId', getUserPosts);
router.post('/:id/like', protect, likePost);
router.post('/:id/unlike', protect, removeLikePost);
router.route('/:id').get(getPost).put(protect, updatePost).delete(protect, deletePost);
router.get('/:id/comments', getPostComments);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
