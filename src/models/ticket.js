const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  phoneno: {
    type: Number,
    required: true,
    length: 10,
  },
  showtime: {
    type: String,
    required: true,
  },
  UTCtiming: {
    type: Date,
    required: true,
  },
  expired: {
    type: Boolean,
    default: false,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
