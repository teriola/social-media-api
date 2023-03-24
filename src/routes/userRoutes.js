const router = require('express').Router();
const { } = require('../controlers/userControler');

router.route('/').get().post();
router.route('/:id').put().delete();

module.exports = router;
