const express = require("express");

const VolunteerRouter = express.Router();
const Volunteer = require("../models/Volunteer.model");

VolunteerRouter.get("/", async (req, res) => {
  try {
    const volunteerData = await Volunteer.find();
    res.status(200).json(volunteerData);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching the volunteer data" });
  }
});

VolunteerRouter.post("/", async (req, res) => {
  const { name, gender, age, phoneNumber, interests, skills, availability } =
    req.body;

  try {
    const volunteerAdded = new Volunteer({
      name,
      gender,
      age,
      phoneNumber,
      interests,
      skills,
      availability,
    });
    await volunteerAdded.save();
    res.status(201).json({ message: "Volunteer details added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while adding a volunteer" });
  }
});

VolunteerRouter.put("/:id", async (req, res) => {
  const volunteerId = req.params.id;
  const updatedData = req.body;

  try {
    const volunteerUpdated = await Volunteer.findByIdAndUpdate(
      volunteerId,
      updatedData,
      { new: true }
    );

    if (!volunteerUpdated) {
      res.status(404).json({ error: "Couldnt find the volunteer to update" });
    }
    res.status(201).json({ message: "Successfully updated the volunteer" });
  } catch (error) {
    res.status(500).json({ error: "Error while updating the volunteer" });
  }
});

VolunteerRouter.delete("/:id", async (req, res) => {
  const volunteerId = req.params.id;
  try {
    const volunteerDeleted = await Volunteer.findByIdAndDelete(volunteerId);

    if (!volunteerDeleted) {
      res.status(404).json({ error: "Error while finding the volunteer" });
    }
    res.status(200).json({ message: "Successfully deleted the volunteer" });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting the volunteer" });
  }
});

module.exports = VolunteerRouter;
