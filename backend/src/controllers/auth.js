const { sign } = require('jsonwebtoken');
const response = require('./response');

function generateToken(payload) {
    const secret = process.env.JWT_SECRET;

    return sign(payload, secret, {
        expiresIn: '2h',
    });
}

function login(req, res) {
    const { emailusername, password } = req.body;
    console.log(emailusername, password)
    const token = generateToken({ emailusername });
    response(res, 200, true, 'Ha iniciado sesion correctamente', { emailusername, token });
}


module.exports = {
    login
}