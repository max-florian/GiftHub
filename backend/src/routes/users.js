const router = require('express').Router();
const { getUser } = require('../controllers/users');
const { verifyToken } = require('../controllers/auth.middleware');

router.get('/:id', verifyToken, getUser);

module.exports = router;