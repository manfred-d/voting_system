const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  lastName: {
    type: String,
    require: [true, "Enter Last name"],
  },
  firstName: {
    type: String,
    required: [true, "Enter first name"],
  },
  nationalID: {
    type: Number,
    required: [true, "Enter national ID"],
  },
  workID: {
    type: Number,
    required: [true, "Work ID"],
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
}, {collection: 'admins'});

module.exports = mongoose.model("Admin", adminSchema);
