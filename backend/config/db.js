const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGO_URI); // remove this after you've confirmed it working

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);

    console.log("database connected: ", res.connection.host);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
