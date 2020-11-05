const router = require('express').Router();
const { transactionLog } = require('../controllers/transactionLog');

router.get('/:user', transactionLog);

module.exports = router;