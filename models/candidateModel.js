const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema(
  {
    fullNames: {
      type: String,
      required: [true, "Please Enter your first name"],
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
  },
  {
    collection: "candidates",
  }
);

module.exports = mongoose.model("Candidate", candidateSchema);
