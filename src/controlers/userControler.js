const router = require('express').Router();
const { handleResponse, validateUtility } = require('../middlewares/responseHandler');
const userService = require('../services/userService');

router.get('/', handleResponse(userService.getAllUsers));
router.get('/:id',
  validateUtility({ tokenValidador: true, idValidator: true }, 'User'),
  handleResponse(userService.getUserById));

router.post('/login', handleResponse(userService.login));
router.post('/register', handleResponse(userService.register));
router.get('/logout', 
  validateUtility({ tokenValidador: true }),
  handleResponse(userService.logout));


module.exports = router;
