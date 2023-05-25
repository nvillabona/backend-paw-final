const { check } = require('express-validator');


const commentValidation = () => [
    check('content').notEmpty().withMessage('Content is required'),
    check('user').notEmpty().withMessage('User is required'),
]

const postValidation = [
    check('title').notEmpty().withMessage('Title is required'),
    check('content').notEmpty().withMessage('Content is required'),
    check('imageUrl').optional().isURL().withMessage('Invalid image URL'),
    check('user').notEmpty().withMessage('User is required'),
]

module.exports = {
    commentValidation,
    postValidation,
};
