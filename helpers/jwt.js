const jwt = require('jsonwebtoken');

const generateJWT = (uid, name ) => {
    return new Promise((resolve, reject) => {
        const payload = {uid: uid, name: name}
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        },(error, token)=> {
            if(error) {
                console.log(error);
                reject('The token could not be generated');
            }
            resolve(token);
        })
    })
}

module.exports = { generateJWT }