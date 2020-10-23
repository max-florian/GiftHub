const { verify } = require('jsonwebtoken');
const response = require('./response');

function verifyToken(req, res, next) {
    const secret = process.env.JWT_SECRET;
    try {
        const token = req.headers.authorization.replace('Bearer ', '');

        if (token) {
            verify(token, secret, (err, _) => {
                if (err) {
                    return response(res, 401, false, 'Token invalido', {});
                } else {
                    return next();
                }
            });
        } else return response(res, 400, false, 'Token no proveido', {});
    } catch (error) {
        return response(res, 400, false, 'Token no proveido', {});
    }
};

module.exports = {
    verifyToken
}