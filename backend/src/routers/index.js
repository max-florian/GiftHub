  
const router = require('express').Router();
const authRoutes = require('./auth');

const useInventoryRoutes = requiere('./userInventory');

router.use('', authRoutes);

router.use('/userInventory', userInventoryRoutes);

module.exports = router;