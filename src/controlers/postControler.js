const router = require('express').Router();
const { handleResponse, validateUtility } = require('../middlewares/responseHandler');
const postService = require('../services/postService');

router.get('/', handleResponse(postService.getAllPosts));
router.post('/', handleResponse(postService.createPost));

router.get('/user/:id', handleResponse(postService.getPostsByUser));
router.get('/bookmark/:id', handleResponse(postService.getBookmarksByUser));
router.post('/:id/like', handleResponse(postService.likePost));

router.get('/:id',
    validateUtility({ idValidator: true }, 'Post'),
    handleResponse(postService.getPostById));

module.exports = router;
