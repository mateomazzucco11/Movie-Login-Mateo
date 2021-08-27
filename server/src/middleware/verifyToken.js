const jwt = require('jsonwebtoken');

require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.headers['accessToken'];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, email) => {
        if (err) {
            return res
                .status(500)
                .json({
                    msg: 'There was a problem on the server'
                })
        }
        return req.email = email;

        next();
    })
}

module.exports = verifyToken;