const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');

router.use('', authRoutes);
router.use('/users', usersRoutes);

module.exports = router;