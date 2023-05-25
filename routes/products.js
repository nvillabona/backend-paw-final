const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getAllProducts } = require('../controllers/productsController');
const validateProduct = require('../middlewares/products');


router.get('/', getAllProducts);
router.post('/', validateProduct , createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
