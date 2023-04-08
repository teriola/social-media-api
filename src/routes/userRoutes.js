const router = require('express').Router();
const { registerUser, loginUser, getMe, getUserById, getUserFollowers, logoutUser, patchUser, followUser } = require('../controlers/userControler');
const protect = require('../middlewares/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/:id/followers', getUserFollowers);
router.post('/:userId/follow', protect, followUser);
router.get('/:id', getUserById);
router.patch('/:userId', protect, patchUser);
router.get('/logout', protect, logoutUser);

module.exports = router;
