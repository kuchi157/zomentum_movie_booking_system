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
    return res
      .status(406)
      .send("Ticket cannot be booked. Movie already started or over ");
  }

  const oldTicket = await Ticket.find({
    showtime: req.body.showtime,
  });

  if (oldTicket.length >= 20) {
    return res
      .status(404)
      .send(
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

app.patch("/updateTiming/:id", async (req, res) => {
  const time = moment(req.body.showtime, "DD-MM-YYYY hh:mm");
  const utcTime = time.toISOString();

  timeDiff = moment().diff(utcTime, "seconds");

  if (timeDiff > 0) {
    return res
      .status(406)
      .send("Ticket time cannot be updated. Movie already started or over ");
  }
  try {
    ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id },
      { showtime: req.body.showtime, UTCtiming: utcTime },
      {
        new: true,
        runValidators: true,
      }
    );

    if (ticket == null) {
      return res.status(404).send("Invalid Ticket Id!");
    }

    res.send(ticket);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/viewTicket/:showtime", async (req, res) => {
  try {
    const viewTicket = await Ticket.find({
      showtime: req.params.showtime,
    });

    if (viewTicket.length == 0) {
      return res.status(404).send("No ticket booked for the given time!");
    }
    res.send(viewTicket);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete("/deleteTicket/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (ticket == null) {
      return res.status(404).send("Invalid Ticket Id!");
    }

    ticket.remove();
    res.send("ticket got removed!");
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/viewTicketUser/:id", async (req, res) => {
  try {
    const ticketUser = await Ticket.find({
      _id: req.params.id,
    });

    if (ticketUser.length == 0) {
      return res.status(404).send("Invalid Ticket Id!");
    }

    res.send({
      UserName: ticketUser[0].username,
      PhoneNo: ticketUser[0].phoneno,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

//listening the application
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
