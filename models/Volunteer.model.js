const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  phoneNumber: Number,
  interests: [String],
  skills: [String],
  availability: Boolean,
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;
