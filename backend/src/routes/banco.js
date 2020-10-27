const router = require('express').Router()
const {validateTransaccion} = require('../controllers/banco')

router.post('', validateTransaccion)

module.exports = router
