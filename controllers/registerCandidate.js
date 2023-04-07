// admins can register candidates

const express = require('express');
const Admin = require('../models/adminModel');
const Candidate = require('../models/candidateModel');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');

const registerCandidate = catchAsync(async (req, res, next) => {
    try {
        const { workID, password, fullNames, candidateID, position, politicalParty, partyID, } = req.body;

        if (!workID || !password || !fullNames || !candidateID || !position || !politicalParty || !partyID) {
            return next(new AppError('All fields are required', 400));
        }

        const existingAdmin = await Admin.findOne({ workID });
        if (!existingAdmin) {
            return next(new AppError('Admin not found', 404));
            throw new Error('Only admins can register candidates');
        }
        if (existingAdmin && await bcrypt.compare(password, existingAdmin.password)) {
            const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            const existingCandidate = await Candidate.findOne({ candidateID });
            if (existingCandidate) {
                return next(new AppError('Candidate already exists', 400));
            }
            const newCandidate = await Candidate.create({
                fullNames,
                candidateID,
                position,
                politicalParty,
                partyID,
            });
            if (newCandidate) {
                res.status(201);
                res.json({
                    _id: newCandidate.id,
                    fullNames: newCandidate.fullNames,
                    candidateID: newCandidate.candidateID,
                    position: newCandidate.position,
                    politicalParty: newCandidate.politicalParty,
                    partyID: newCandidate.partyID,
                    token
                });
            }
        } else {
            return next(new AppError('Invalid password', 401));
        }
    } catch (error) {
        return next(new AppError(error, 500));
        throw new Error(error.message);
    }
});


module.exports = { registerCandidate };
