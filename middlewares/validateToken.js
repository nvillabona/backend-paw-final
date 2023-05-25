const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            ok: false,
            msg: 'No se proporcionó un token válido'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }

    next();
};

module.exports = {
    validateJWT
};
