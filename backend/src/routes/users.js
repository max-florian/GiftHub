const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { verifyToken } = require('../controllers/auth.middleware');

router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);

module.exports = router;