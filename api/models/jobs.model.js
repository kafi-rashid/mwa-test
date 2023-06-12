const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
})

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required!"]
  },
  salary: {
    type: Number,
    required: [true, "Salary is required!"]
  },
  location: locationSchema,
  description: {
    type: String,
    required: [true, "Description is required!"]
  },
  experience: Number,
  skills: [String],
  postDate: Date
})

mongoose.model("Job", jobSchema, "jobs");