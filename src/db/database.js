const mongoose = require("mongoose");
const mongodb_url =
  "mongodb+srv://zomentum-movie-booking-system:kuchi157@cluster0.zauks.mongodb.net/test?retryWrites=true";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
