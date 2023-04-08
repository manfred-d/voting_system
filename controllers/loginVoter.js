const mongoose = require("mongoose");
const Voter = require("../models/votermodel");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");

const loginVoter = catchAsync(async (req, res, next) => {
    const { nationalID, Password } = req.body;

    const existigVoter = await Voter.findOne({ nationalID });
    if (!existigVoter) {
        return next(new AppError("Voter not found", 404));
    }
    const matchId = await compare(nationalID, existigVoter.nationalID);
    const matchPassword = await bcrypt.compare(Password, existigVoter.Password);
    if (!matchId || !matchPassword) {
        return next(new AppError("Invalid credentials", 401));
    }
    const token = jwt.sign({ id: existigVoter._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.status(200).json({
        status: "success",
        data: {
            voter: {
                id: existigVoter.id,
                fullname: existigVoter.fullNames,
                nationalID: existigVoter.nationalID,
                residence: existigVoter.residence,
                phoneNumber: existigVoter.phoneNumber,
                email: existigVoter.email,
            },
            token,
        },
    });

});

module.exports = { loginVoter };
