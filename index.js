const express = require("express");
const cors = require("cors");

const initializeDatabase = require("./db");
const EventRouter = require("./routers/Event.router");
const VolunteerRouter = require("./routers/Volunteer.router");

initializeDatabase();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/events", EventRouter);
app.use("/volunteers", VolunteerRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something really went wrong" });
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Volunteer Management Backend");
});

app.listen(PORT, () => {
  console.log("Volunteer Management backend server started");
});
