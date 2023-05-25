const expres = require('express');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    try {
        let user = new User(req.body)
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(req.body.password, salt);
        await user.save();
        res.status(200).json({
            ok: true,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error,
        })
    }
}

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    try {
        const userId = req.params.id; // Extract the user ID from the request parameters
        const updates = req.body; 
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({
                ok: false,
                error: 'User not found',
            });
        }
        res.status(200).json({
            ok: true,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};

const userLogin = async (req, res ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    const { email, password } = req.body
    try{
        let user = await User.findOne({ email: email})
        if(!user){
            return res.status(404).json({
                ok: false,
                message: 'User not found',
            });

        }
        const passwordValid = bcrypt.compareSync(password, user.password)
        if (!passwordValid){
            return res.status(404).json({
                ok: false,
                message: 'The password is not valid'
            });
        }
    } catch(error){
        console.log(error);
    }

    const token = await( generateJWT(req.body.userId, req.body.username))
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    userLogin,
    createUser,
    updateUser
}