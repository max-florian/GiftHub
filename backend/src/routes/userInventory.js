
const router = require('express').Router();
const { getUserCards, updateUser } = require('../controllers/userInventory');
const { verifyToken } = require('../controllers/auth.middleware');

router.get('/:id', getUserCards);

module.exports = router;