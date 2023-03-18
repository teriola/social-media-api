const router = require('express').Router();
const { handleResponse, validateUtility } = require('../middlewares/responseHandler');
const userService = require('../services/userService');

router.get('/', handleResponse(userService.getAllUsers));
router.get('/:id', 
  validateUtility({ tokenValidador: true}),
  handleResponse(userService.getUserById));

<<<<<<< HEAD
router.post('/login', userService.login);
router.post('/register', userService.register);
=======
// router.get('/logout', userService.logout);
router.post('/register', handleResponse(userService.register));
router.post('/login', handleResponse(userService.login));
>>>>>>> a65fda7 (fix errors and add error handling)

module.exports = router;
