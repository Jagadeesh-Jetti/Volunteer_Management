const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  date: Date,
  volunteers: [
    {
      role: String,
      number: Number,
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
