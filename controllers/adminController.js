const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const registerAdmin = expressAsyncHandler(async (req, res) => {
    const {
        lastName,
        firstName,
        nationalID,
        workID,
        email,
        password
    } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            res.status(403);
            res.json(`${existingAdmin.email} already registered, please login`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = await Admin.create({
            lastName,
            firstName,
            nationalID,
            workID,
            email,
            password: hashedPassword
        });
        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        if (newAdmin) {
            res.status(201);
            res.json({
                _id: newAdmin.id,
                lastName: newAdmin.lastName,
                firstName: newAdmin.firstName,
                nationalID: newAdmin.nationalID,
                workID: newAdmin.workID,
                email: newAdmin.nationalID,
                password: hashedPassword
            });
        } else {
            res.status(403);
            throw new Error('Validation error');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500);
        res.json('Could not validate your credentials, please try again');
    }
});


const loginAdmin = expressAsyncHandler(async (req, res) => {
    const { workID, password } = req.body;
    try {
        if (!workID || !password) {
            res.status(400);
            throw new Error('Please provide your work ID and password');
        }
        const existingAdmin = await Admin.findOne({ workID });
        if (!existingAdmin) {
            res.status(403);
            throw new Error('Credentials not found, are you registered?');
        }
        const isMatch = await bcrypt.compare(password, existingAdmin.password);
        if (!isMatch) {
            res.status(403);
            throw new Error('Access Denied, check your password and try again');
        }
        const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        if (existingAdmin) {
            res.status(200);
            res.json({
                _id: existingAdmin.id,
                lastName: existingAdmin.lastName,
                firstName: existingAdmin.firstName,
                nationalID: existingAdmin.nationalID,
                workID: existingAdmin.workID,
                email: existingAdmin.email,
                token
            });
        } else {
            res.status(403);
            throw new Error('Validation error, please contact IT support');
        }
    } catch (error) {
        res.status(500);
        throw new Error(error, error.message);
        res.json('Could not validate your credentials, please try again')
    }
});


module.exports = { registerAdmin, loginAdmin };
