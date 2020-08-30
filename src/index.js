const express = require("express");
const moment = require("moment");
require("./db/database");
const Ticket = require("./models/ticket");

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

app.post("/bookTicket", async (req, res) => {
  const time = moment(req.body.showtime, "DD-MM-YYYY hh:mm");
  const utcTime = time.toISOString();

  req.body.UTCtiming = utcTime;

  timeDiff = moment().diff(utcTime, "seconds");

  if (timeDiff > 0) {
    return res.send("Ticket cannot be booked. Movie already started or over ");
  }

  const oldTicket = await Ticket.find({
    showtime: req.body.showtime,
  });

  if (oldTicket.length >= 20) {
    return res.send(
      "Sorry no ticket is available. All tickets are already being booked."
    );
  }
  const ticket = new Ticket(req.body);
  try {
    await ticket.save();

    res.status(201).send({ ticket });
  } catch (e) {
    res.status(400).send(e);
  }
});

//listening the application
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
