const router = require('express').Router();
const authRoutes = require('./auth');
const transactionLog = require('./transactionLog');

router.use('', authRoutes);
router.use('/transactionLog', transactionLog);

module.exports = router;