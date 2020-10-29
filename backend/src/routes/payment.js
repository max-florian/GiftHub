const router = require('express').Router();
const { payment, getPaymentMethods } = require('../controllers/payment');

router.post('/:id', payment);
router.get('/:id', getPaymentMethods);

module.exports = router;
