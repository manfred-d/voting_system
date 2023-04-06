const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');



const registerAdmin = expressAsyncHandler(async (req, res) => {
    const { lastName, firstName, nationalID, workID, email, password } = req.body;

    try {
        const checkAdmin = await adminModel.findOne({ email });
        switch (checkAdmin) {
            case checkAdmin:
                res.status(400);
                res.json('email already exists');
                break;
            default:
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newAdmin = await Admin.create({ lastName, firstName, nationalID, workID, email, password: hashedPassword });
                const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

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
                    throw new Error('validation error');
                }
        }
    } catch (error) {
        console.log(error, error.message);
        res.status(500);
        res.json('internal server error, please try again')
    }
});

module.exports = { registerAdmin }
