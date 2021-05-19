const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = processs.env;

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // check if token doesn't exists
    if (!token)
        return res.status(401).json({
            statusCode: 401,
            message: 'No token, authorization denied!'
        });
    
    // else token exists
    try {
        // Decode our token
        const decoded = jwt.verify(token, SECRET);

        // Assign user to the request object
        req.user = decoded.user;
        
        next();
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Token is invalid!'
        });
    }
}