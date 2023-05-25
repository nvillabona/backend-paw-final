const { check } = require('express-validator');

const validateProduct = [
    check('name').notEmpty().withMessage('Name is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('price').notEmpty().withMessage('Price is required'),
    check('image').notEmpty().withMessage('Image URL is required'),
];

module.exports = validateProduct;
