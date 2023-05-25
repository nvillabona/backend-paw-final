const { userLogin, createUser, updateUser } = require('../controllers/usersController');
const { userValidation, userLoginValidation } = require('../middlewares/users');
const router = require('express').Router();


router.post('/', userLoginValidation, userLogin)
router.post('/register' , userValidation, createUser)
router.put('/user/:id', userValidation, updateUser)

module.exports = router;