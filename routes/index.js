const { validateJWT } = require('../middlewares/validateToken');

var router = require('express').Router();

router.use('/user', require('./users'));
router.use('/posts', validateJWT,require('./posts'));
router.use('/products', require('./products'));
router.use('/cart', require('./shoppingCart'));



module.exports = router;