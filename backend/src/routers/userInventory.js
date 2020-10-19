
const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/userInventory');
const { verifyToken } = require('../controllers/auth.middleware');

router.get('/:id', verifyToken, getUserInventoryByFilter);

module.exports = router;