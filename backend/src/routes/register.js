const router = require('express').Router();
const { registro } = require('../controllers/register');

router.post('/registro', registro);

module.exports = router;