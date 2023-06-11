const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  lat: {
    type: Number,
    required: [true, "Lattitude is required!"]
  },
  lng: {
    type: Number,
    required: [true, "Longitude is required!"]
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