const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const transactionLog = require('./transactionLog');

router.use('', authRoutes);
router.use('/users', usersRoutes);
router.use('/transactionLog', transactionLog);

module.exports = router;