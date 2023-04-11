const express = require('express');
const Voter = require('../models/votermodel');
const Voter = require('../models/votermodel');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');

const registerVoter = catchAsync(async (req, res, next) => {
    try {
        const { workID, password, fullNames, nationalID, residence, phoneNumber, email, Password } = req.body;

        if (!workID || !password || !fullNames || !nationalID || !residence || !phoneNumber || !email || !Password) {
            return next(new AppError('fields cannot be empty'));

        }
        const existingAdmin = await Admin.findOne({ workID });
        if (!existingAdmin) {
            return next(new AppError('Admin not found', 404));
            throw new Error('Only admins can register voter');
        }
        if (existingAdmin && await bcrypt.compare(password, existingAdmin.password)) {
            const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            const existingVoter = await Voter.findOne({ nationalID });
            if (existingVoter) {
                return next(new AppError('Voter already exists', 400));
            }
            const salt = await bcrypt.genSaltSync(8);
            const hashedPassword = await bcrypt.hashSync(Password, salt);
            const newVoter = await Voter.create({
                fullNames,
                nationalID,
                residence,
                phoneNumber,
                Password: hashedPassword,
                email
            });
            if (newVoter) {
                res.status(201);
                res.json({
                    _id: newVoter.id,
                    fullNames: newVoter.fullNames,
                    residence: newVoter.residence,
                    phoneNumber: newVoter.phoneNumber,
                    email: newVoter.email,
                    Password: hashedPassword,
                    token
                });
            }
        } else {
            return next(new AppError('invalid credentials'));

        }
       

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
});


module.exports = { registerVoter}
