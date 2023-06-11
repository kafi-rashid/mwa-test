const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: String,
  username: String,
  password: String
})

mongoose.model("User", userSchema, "users");