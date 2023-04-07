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

module.exports = { registerAdmin };
