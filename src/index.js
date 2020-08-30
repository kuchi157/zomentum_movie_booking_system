const express = require("express");
const moment = require("moment");
const CronJob = require("cron").CronJob;
const connectDB = require("./db/database");
const Ticket = require("./models/ticket");

connectDB();
const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

//EndPoint- to book a ticket using a username, phoneno and showtime
app.post("/bookTicket", async (req, res) => {
  const time = moment(req.body.showtime, "DD-MM-YYYY hh:mm");
  const utcTime = time.toISOString(); //converting time to utc format

  req.body.UTCtiming = utcTime;

  timeDiff = moment().diff(utcTime, "seconds"); //currTime-ticketTime

  //Ticket for movie already started or over cannot be book
  if (timeDiff > 0) {
    return res
      .status(406)
      .send("Ticket cannot be booked. Movie already started or over ");
  }

  const oldTicket = await Ticket.find({
    showtime: req.body.showtime,
  });

  //checking for a particular timing, a maximum of 20 tickets can be booked
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

//Endpoint- to update a ticket timing
app.patch("/updateTiming/:id", async (req, res) => {
  const time = moment(req.body.showtime, "DD-MM-YYYY hh:mm");
  const utcTime = time.toISOString(); //converting time to UTC format

  timeDiff = moment().diff(utcTime, "seconds"); //currentTime-ticketTime

  //Time cannot be updated for movie already started or over
  if (timeDiff > 0) {
    return res
      .status(406)
      .send("Ticket time cannot be updated. Movie already started or over ");
  }

  const oldTicket = await Ticket.find({
    showtime: req.body.showtime,
  });

  //checking for a particular timing, a maximum of 20 tickets can be booked
  if (oldTicket.length >= 20) {
    return res
      .status(404)
      .send(
        "Sorry no ticket is available. All tickets are already being booked for this time."
      );
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

    //Checking Invalid Ticket ID
    if (ticket == null) {
      return res.status(404).send("Invalid Ticket Id!");
    }

    res.send(ticket);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Endpoint- View all the ticket for a particular time
app.get("/viewTicket/:showtime", async (req, res) => {
  try {
    const viewTicket = await Ticket.find({
      showtime: req.params.showtime,
    });

    //Checking if no ticket booked for the given time
    if (viewTicket.length == 0) {
      return res.status(404).send("No ticket booked for the given time!");
    }
    res.send(viewTicket);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Endpoint- delete particular ticket
app.delete("/deleteTicket/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    //Checking Invalid Ticket ID
    if (ticket == null) {
      return res.status(404).send("Invalid Ticket Id!");
    }

    ticket.remove();
    res.send("ticket got removed!");
  } catch (e) {
    res.status(500).send(e);
  }
});

//Endpoint- View user's details based on ticket Id
app.get("/viewTicketUser/:id", async (req, res) => {
  try {
    const ticketUser = await Ticket.find({
      _id: req.params.id,
    });

    //Checking Invalid Ticket ID
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

//Using CronJob for updating expiry ticket to expired  and deleting of expiry tickets
const job = new CronJob("* * * * * *", async () => {
  try {
    const ticket = await Ticket.find({ expired: false });
    for (i = 0; i < ticket.length; i++) {
      ticketTime = ticket[i].UTCtiming;
      timeDiff = moment().diff(ticketTime, "hours"); //curentTime-ticketTime

      //Updating ticket to expired if currTime-ticketTime>=8 hrs
      if (timeDiff >= 8) {
        await Ticket.findOneAndUpdate(
          { _id: ticket[i]._id },
          { expired: true },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    }

    //Deleting ticket automatically if already expired
    await Ticket.deleteMany({ expired: true });
  } catch (e) {}
});
job.start();

//listening the application
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
