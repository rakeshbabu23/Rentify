const mongoose = require("mongoose");
require("dotenv").config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const connectDB = async () => {
  const URL =
    "mongodb+srv://baburakesh2301:rakesh@cluster123.vtfkmqe.mongodb.net/rentify";

  try {
    await mongoose.connect(URL, { useUnifiedTopology: true });
    console.log("Database successful");
  } catch (error) {
    console.log("ERROR WHILE CONNECTING");
    console.log(error.message);
  }
};

module.exports = connectDB;
