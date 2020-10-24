const router = require('express').Router();
const registerRoutes = require('./register');

router.use('', registerRoutes);

module.exports = router;