const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const databaseInstance = require('./config/db');
const errorHandler = require('./helpers/errorHandler');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(cors())

//routes
//dummy route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the server"
    })
});

app.use('/auth/admin', require('./routes/adminRouter'));
app.use('/auth/candidate', require('./routes/candidateRoute'));

// voter routes
app.use('/auth/voter', require('./routes/voterRoutes'))
//database connection
databaseInstance();

app.listen(port, () => { console.log(`Server is running on port ${port}`.yellow.underline) });

