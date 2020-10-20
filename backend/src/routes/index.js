  
const router = require('express').Router();

const userInventoryroutes = require('./userInventory');


router.use('/userCards', userInventoryroutes);

module.exports = router;