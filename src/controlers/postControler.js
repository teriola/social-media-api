const router = require('express').Router();
const { handleResponse, validateUtility } = require('../middlewares/responseHandler');
const postService = require('../services/postService');

router.get('/', handleResponse(postService.getAllPosts));
router.post('/', postService.createPost);
router.get('/user/:id', handleResponse(postService.getPostsByUser));

// router.post('/register', handleResponse(postService.register));
// router.get('/logout', validateUtility({ tokenValidador: true }), postService.logout);

router.get('/:id',
    validateUtility({ idValidator: true }, 'Post'),
    handleResponse(postService.getPostById));
module.exports = router;