const Schema = require('mongoose').Schema;
const mongoose = require('mongoose')

const VoterSchema = new Schema({
    fullNames: {
        type: String,
        required: [true, 'Enter full names']
    },
    nationalID: {
        type: Number,
        required: [true, 'Enter national ID'],
        unique: true,
        minLength: [8, 'National ID must be 8 digits'],
    },
    residence: {
        type: String,
        required: [true, 'Enter residence']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Enter phone number'],
        unique: true,
        minLength: [10, 'Phone number must be 10 digits'],
    },
    email: {
        type: String,
        required: [true, 'Enter email'],
        unique: true
    },
    Password: {
        type: String,
        required: [true, 'Enter Password'],
    },
});


const Voter = mongoose.model('Voter', VoterSchema);
module.exports = Voter;
