const mongoose = require("mongoose");

const CandidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  candidateID: {
    type: Number,
    required: [true, "Enter candidate Id"],
    unique: true,
  },
  position: {
    type: String,
    required: [true, "Vying position"],
  },
  politicalParty: {
    type: String,
    required: true,
  },
  partyID: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});
