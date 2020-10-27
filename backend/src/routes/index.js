const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const paymentRoutes = require('./payment');
const bancoRoutes = require('./banco');

router.use('', authRoutes);
router.use('/users', usersRoutes);
router.use('/payment', paymentRoutes);
router.use('/banco',bancoRoutes)

module.exports = router;
