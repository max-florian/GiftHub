const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const transactionLog = require('./transactionLog');
const paymentRoutes = require('./payment');
const bancoRoutes = require('./banco');
const userInventoryroutes = require('./userInventory');
const registerRoutes = require('./register');

router.use('', authRoutes);
router.use('/users', usersRoutes);
router.use('/transactionLog', transactionLog);
router.use('/payment', paymentRoutes);
router.use('/banco',bancoRoutes)
router.use('/userCards', userInventoryroutes);
router.use('/registro',registerRoutes);

module.exports = router;
