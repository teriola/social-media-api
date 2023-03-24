const router = require('express').Router();
const { registerUser, loginUser, getMe, getUserById, getUserFriends, logoutUser } = require('../controlers/userControler');
const protect = require('../middlewares/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/:id/friends', getUserFriends);
router.get('/:id', getUserById);
router.get('/logout', logoutUser);

module.exports = router;
