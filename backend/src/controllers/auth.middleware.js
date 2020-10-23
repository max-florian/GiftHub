const { verify } = require('jsonwebtoken');
const response = require('./response');

function verifyToken(req, res, next) {
    const secret = process.env.JWT_SECRET;
    const token = req.headers.authorization.replace('Bearer ', '');

    if (token) {
        verify(token, secret, (err, _) => {
            if (err) {
                return response(res, 401, false, 'Token no invalido', {});
            } else {
                next();
            }
        });
    } else {
        return response(res, 200, false, 'Token no proveido', {});
    }
};

module.exports = {
    verifyToken
}