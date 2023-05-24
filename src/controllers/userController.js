const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const { getUser, getUserFollowers, postUserFollower } = require('../services/userService');
const { parseError } = require('../utils/parser');

// Get current user
// GET /users/me
// Private
router.get('/me', 
    isAuth,
    async (req, res) => {
        try {
            const { 
                _id,
                name,
                surname,
                email,
                description,
                profilePicture, 
                coverPicture,
            } = await getUser(req.user._id);

            res.status(200).json({
                _id,
                name,
                surname,
                email,
                description,
                profilePicture,
                coverPicture,
            });
        } catch(err) {
            res.status(404).json({ message: err.message });
        }
    });

// Get user by id
// GET /users/:id
// Public
router.get('/:id', async (req, res) => {
    try {
        const {
            _id,
            name,
            surname,
            email,
            description,
            profilePicture,
            coverPicture,
        } = await getUser(req.params.id);

        res.status(200).json({
            _id,
            name,
            surname,
            email,
            description,
            profilePicture,
            coverPicture,
        });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Get user followers
// GET /users/:id/followers
// Public
router.get('/:id/followers', async (req, res) => {
    try {
        const followers = await getUserFollowers(req.params.id);

        res.status(200).json(followers);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Post user follower
// POST /users/:id/follow
// Private
router.post('/:id/follow', 
    isAuth,
    async (req, res) => {
        try {
            await postUserFollower(req.params.id, req.user._id);

            res.status(201).json({ 
                message: 'Followed user',
            });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    });

module.exports = router;

/*
// Patch user
// PATCH /users/:userId
// Private
const patchUser = asyncHandler(async (req, res) => {
const user = await User.findById(req.params.userId);
if (!user) {
res.status(404);
throw new Error('User not found');
}
const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body);

res.status(200).json(updatedUser);
});
*/