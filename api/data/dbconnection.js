const mongoose = require("mongoose");
require("dotenv").config();
require("../models/jobs.model");
require("../models/user.model");

mongoose.connect(process.env.DB_ADDRESS + "/" + process.env.DB_NAME);

mongoose.connection.on("connected", function() {
  console.log("Database connected!");
});

mongoose.connection.on("disconnected", function() {
  console.log("Database disconnected!");
});