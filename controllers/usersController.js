const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { SECRET } = process.env;

/* 
    @route  -> POST api/auth/login
    @desc   -> Auth user(student, tutor, admin) and get token
    @access -> Public
*/

exports.loginUser = async(req, res) => {
    // finds the validation error in the request and wraps them in an object
    const errors = validationResult(req);

    // Check for errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // initialize new user
        // find user object in db
        let user = await User.findOne({ email });

        // check if user already doesn't exist
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid credentials'
            });
        };

        // else check password matches with hashed password
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.statusCode(400).json({
                statusCode: 400,
                message: 'Invalid credentials'
            });
        
        // if there's a match, send token
        // send payload
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            SECRET,
            { expiresIn: '86400s' }, // expires in 1 day
            (err, token) => {
            if (err) throw err;
                res.json({
                    statusCode: 200,
                    message: 'logged in successfully',
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userRole: user.userRole,
                        isTutor: user.isTutor,
                        isAdmin: user.isAdmin
                    },
                    token
                });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}