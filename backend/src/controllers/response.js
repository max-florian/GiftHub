module.exports = function response(res, statuscode, ok, message = '', payload = {}) {
    res.statusCode = statuscode;
    res.json({ ok, message, statuscode, data: payload });
}