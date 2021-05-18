/* 
TODO
- Creating an express server
- Connect to mongoDB
- Initialize express
- Initialize express mildleware
- Send a simple get request route
- Inject our routes
- Listen to an app connection
*/

const express = require('express');

// Initialize express app
const app = express();

// To be able to use the environment variables in the .env file
require('dotenv').config();
const { PORT } = process.env;

const Database = require('./db');

// Connect to database
const db = new Database();
db.connect()
    .then(() => {
        console.log('successfully connected to database');
        app.listen(PORT, () => console.log(`app running on port ${PORT}`));
    })
    .catch(err => {
        console.error(err.message);
        // exit with failure
        process.exit(1);
    });

// Iniialize middleware
app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: false }));

// Create a basic route
app.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome to School System" });
});