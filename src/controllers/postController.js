const { validationResult } = require('express-validator');
const { isAuth } = require('../middlewares/authMiddleware');
const { getAllPosts, createPost, getUserPosts, getUserBookmarks, setUserBookmark, removeUserBookmark, removePost, likePost, unlikePost, commentPost, getPostComments, updatePost } = require('../services/postService');
const { validatePost } = require('../utils/validations');
const { parseError } = require('../utils/parser');

const router = require('express').Router();

// Get all posts
// GET /posts
// Public
router.get('/', async (req, res) => {
    const posts = await getAllPosts();
    res.status(200).json(posts);
});

// Create post
// POST /posts
// Private
router.post('/',
    isAuth,
    validatePost(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) throw errors;

            // Create post
            const post = await createPost(req.body, req.user._id);

            res.status(200).json(post);
        } catch (err) {
            res.status(400).json({
                errors: parseError(err)
            });
        }
    });

// Get posts for user
// GET /posts/user/:id
// Public
router.get('/user/:id', async (req, res) => {
    const posts = await getUserPosts(req.params.id);
    res.status(200).json(posts);
});

// Get bookmarks for user
// GET /posts/bookmarks
// Private
router.get('/bookmarks',
    isAuth,
    async (req, res) => {
        const bookmarks = await getUserBookmarks(req.user._id);

        res.status(200).json(bookmarks);
    });

// Set bookmark for user
// POST /posts/:id/bookmark
// Private
router.post('/:id/bookmark',
    isAuth,
    async (req, res) => {
        try {
            await setUserBookmark(req.user._id, req.params.id);

            res.status(204).json({});
        } catch (err) {
            res.status(400).json({
                errors: parseError(err),
            });
        }
    });

// Remove bookmark for user
// DELETE /posts/:id/bookmark
// Private
router.delete('/:id/bookmark',
    isAuth,
    async (req, res) => {
        try {
            await removeUserBookmark(req.user._id, req.params.id);

            res.status(204).json({});
        } catch (err) {
            res.status(404).json({
                errors: parseError(err),
            });
        }
    });

// Delete post
// DELETE /posts/:id
// Private
router.delete('/:id',
    isAuth,
    async (req, res) => {
        try {
            await removePost(req.params.id, req.user._id);

            res.status(204).json({});
        } catch (err) {
            res.status(400).json({
                errors: parseError(err),
            });
        }
    });

// Like post
// POST /posts/:id/like
// Private
router.post('/:id/like',
    isAuth,
    async (req, res) => {
        try {
            const post = await likePost(req.params.id, req.user._id);

            res.status(200).json(post);
        } catch (err) {
            res.status(400).json({
                errors: parseError(err),
            });
        }
    });

// Unlike post
// POST /posts/:id/unlike
// Private
router.delete('/:id/unlike',
    isAuth,
    async (req, res) => {
        try {
            const post = await unlikePost(req.params.id, req.user._id);

            res.status(200).json(post);
        } catch (err) {
            res.status(400).json({
                errors: parseError(err),
            });
        }

    });

// Post comment
// POST /posts/:id/comment
// Private
router.post('/:id/comment',
    isAuth,
    async (req, res) => {
        try {
            await commentPost(req.params.id, req.user._id, req.body.text);

            res.status(204).json({});
        } catch (err) {
            res.status(400).json({
                errors: parseError(err),
            });
        }
    });

// Get comments
// GET /posts/:id/comments
// Public
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await getPostComments(req.params.id);

        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json({
            errors: parseError(err),
        });
    }
});

// Update post
// PUT /posts/:id
// Private
router.put('/:id/',
    isAuth,
    validatePost(),
    async (req, res) => {
        try {
            const post = await updatePost(req.params.id, req.body);

            res.status(200).json(post);
        } catch (err) {
            res.status(400).json({
                errors: parseError(err),
            });
        }
    });

module.exports = router;
