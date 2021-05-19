const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = processs.env;

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).json({
            statusCode: 401,
            message: 'No token, Authorization denied!'
        });
}