const router = require('express').Router();
const { registerUser, loginUser, getMe, getUserById, getUserFriends, logoutUser, patchUser } = require('../controlers/userControler');
const protect = require('../middlewares/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/:id/friends', getUserFriends);
router.get('/:id', getUserById);
router.patch('/:userId', protect, patchUser);
router.get('/logout', protect, logoutUser);

module.exports = router;
