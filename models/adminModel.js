const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  lastname: {
    type: String,
    require: [true, "Enter Last name"],
  },
  firstname: {
    type: String,
    required: [true, "Enter first name"],
  },
  nationaID: {
    type: Number[10],
    required: [true, "Enter national ID"],
  },
  workID: {
    type: Number,
    required: [true, "Work ID"],
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Enter Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
});
