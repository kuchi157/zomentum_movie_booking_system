const mongoose = require("mongoose");
const mongodb_url = "mongodb://127.0.0.1:27017/zomentum-ticket-booking-system";

mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
