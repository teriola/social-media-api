const router = require('express').Router();
const { getPosts, setPost, updatePost, deletePost } = require('../controlers/postControler');

router.route('/').get(getPosts).post(setPost);
router.route('/:id').put(updatePost).delete(deletePost);

module.exports = router;
