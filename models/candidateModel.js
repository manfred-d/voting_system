const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter your last name"],
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Candidate", candidateSchema);
