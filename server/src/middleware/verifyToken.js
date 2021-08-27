const jwt = require('jsonwebtoken');

require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.headers['accesstoken'];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, resp) => {
        if (err) {
            return res
                .status(500)
                .json({
                    msg: 'There was a problem on the server'
                })
        }

        req.email = resp.email;
        req.admin = resp.admin;

        next();
    })
}

module.exports = verifyToken;