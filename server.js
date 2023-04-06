const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const databaseInstance = require('./config/db');
const errorHandler = require('./helpers/errorHandler');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);


//routes
//dummy route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the server"
    })
});

//database connection
databaseInstance();

app.listen(port, () => { console.log(`Server is running on port ${port}`.yellow.underline) });

