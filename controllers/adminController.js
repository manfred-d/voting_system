const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

//Input Validator
const validateInput = [
    body('workID').trim().notEmpty().withMessage('Work ID is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    catchAsync(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array()[0], msg, 400))
        }
        next();
    }),
];

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

const loginAdmin = catchAsync(async (req, res, next) => {
    const { workID, password } = req.body;
    const existingAdmin = await Admin.findOne({ workID });

    if (!existingAdmin) {
        return next(new AppError('Invalid credentials', 401));
    }

    const isMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!isMatch) {
        return next(new AppError('Invalid credentials', 401));
    }

    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.status(200).json({
        status: 'success',
        data: {
            admin: {
                id: existingAdmin.id,
                lastName: existingAdmin.lastName,
                firstName: existingAdmin.firstName,
                nationalID: existingAdmin.nationalID,
                workID: existingAdmin.workID,
                email: existingAdmin.email,
            },
            token,
        },
    });
});

module.exports = { registerAdmin, loginAdmin };
