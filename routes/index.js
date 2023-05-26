const { validateJWT } = require('../middlewares/validateToken');

var router = require('express').Router();

router.use('/user', require('./users'));
router.use('/posts', validateJWT,require('./posts'));
router.use('/products', validateJWT, require('./products'));
router.use('/cart', validateJWT, require('./shoppingCart'));



module.exports = router;