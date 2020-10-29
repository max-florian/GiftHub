const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const transactionLog = require('./transactionLog');

router.use('', authRoutes);
router.use('/users', usersRoutes);
router.use('/transactionLog', transactionLog);
router.use('/payment', paymentRoutes);
router.use('/banco',bancoRoutes)

module.exports = router;