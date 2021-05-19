const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// import the router controllers
const usersController = require('../controllers/usersController');

// import the authorization middleware
const auth = require('../middleware/auth');

// login user route
router.post(
    '/api/auth/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'A valid password is required').exists()
    ],
    usersController.loginUser
);

// get logged in user
router.get('api/auth', auth, usersController.getLoggedInUser);

module.exports = router;