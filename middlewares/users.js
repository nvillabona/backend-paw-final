const { check } = require('express-validator');

const userValidation = [
  check('name')
    .notEmpty()
    .withMessage('Name is required'),
  check('username')
    .notEmpty()
    .withMessage('Username is required'),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  check('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const userLoginValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  check('password')
    .notEmpty()
    .withMessage('Password is required'),
]

module.exports = {userValidation, userLoginValidation};