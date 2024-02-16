const express = require("express");

const EventRouter = express.Router();
const Event = require("../models/Event.model");

EventRouter.get("/", async (req, res) => {
  try {
    const eventData = await Event.find();
    res.status(200).json(eventData);
  } catch (error) {
    console.error(500).json({ error: "Error while fetching events" });
  }
});

EventRouter.post("/", async (req, res) => {
  const { name, description, location, date, volunteers } = req.body;

  try {
    const eventAdded = new Event({
      name,
      description,
      location,
      date,
      volunteers,
    });
    await eventAdded.save();
    res.status(200).json({ message: "Event data added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while adding a event" });
  }
});

EventRouter.put("/:id", async (req, res) => {
  const eventId = req.params.id;
  const updatedData = req.body;

  try {
    const eventUpdated = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });

    if (!eventUpdated) {
      res.status(404).json({ error: "Couldnt find the event to add" });
    }
    res.status(201).json({ message: "Event details added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while adding the event details" });
  }
});

EventRouter.delete("/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    const eventDeleted = await Event.findByIdAndDelete(eventId);

    if (!eventDeleted) {
      res.status(404).json({ error: "Couldnt find the event to delete" });
    }
    res.status(201).json({ message: "Event details deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting the event" });
  }
});

module.exports = EventRouter;
