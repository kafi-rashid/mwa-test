const mongoose = require("mongoose");
const Job = mongoose.model("Job");

let response = {
  "status": 200,
  "message": null,
  "data": null
}

const getJobs = function(req, res) {
  let query = {};
  let offset = 0;
  let perPage = 10;
  if (req.query.search) {
    query = { "skills": { $regex: new RegExp(req.query.search, "i") } };
  }
  if (req.query.offset) {
    offset = req.query.offset;
  }
  if (req.query.perPage) {
    perPage = req.query.perPage <= 10 ? req.query.perPage : 10;
  }
  Job.find(query)
    .skip(offset)
    .limit(perPage)
    .exec()
    .then((jobs) => {
      if (jobs && jobs.length > 0) {
        response.status = 200;
        response.data = jobs;
        response.message = jobs.length + " job(s) found!";  
      } else {
        response.status = 404;
        response.data = null;
        response.message = "No jobs found!";  
      }
    })
    .catch((error) => {
      response.status = 500;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
}

const addOneJob = function(req, res) {
  const newJob = req.body;
  Job.create(newJob)
    .then((job) => {
      response.message = "Job has been posted!"
      response.status = 200;
      response.data = job;
    })
    .catch((error) => {
      response.message = error;
      response.data = null;
      response.status = 500;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
}

const getJobById = function(req, res) {
  const jobId = req.params.jobId;
  Job.findById(jobId)
    .exec()
    .then((job) => {
      response.status = 200;
      response.message = "Job found!"
      response.data = job;
    })
    .catch((error) => {
      response.status = 500;
      response.message = error
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
}

const fullUpdateJob = function(req, res) {
  const jobId = req.params.jobId;
  const newJob = req.body;
  Job.findOneAndReplace({_id: jobId}, newJob, { new: true })
    .exec()
    .then((job) => {
      response.status = 200;
      response.data = job;
      response.message = "Job has been updated!"
    })
    .catch((error) => {
      response.status = 500;
      response.data = null;
      response.message = error;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
}

const partialUpdateJob = function(req, res) {
  const jobId = req.params.jobId;
  const newJob = req.body;
  Job.findByIdAndUpdate(jobId, newJob, { new: true })
    .exec()
    .then((job) => {
      response.status = 200;
      response.data = job;
      response.message = "Job has been updated!";
    })
    .catch((error) => {
      response.status = 500;
      response.data = null;
      response.message = error;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
}

const deleteJobByJobId = function(req, res) {
  const jobId = req.params.jobId;
  Job.findByIdAndDelete(jobId)
    .exec()
    .then((job) => {
      response.status = 200;
      response.data = job;
      response.message = "Job has been deleted!";
    })
    .catch((error) => {
      response.status = 500;
      response.data = null;
      response.message = error;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
}

const getTotalJob = function(req, res) {
  let query = {};
  if (req.query.search) {
    query = { "skills": { $regex: new RegExp(req.query.search, "i") } };
  }
  Job.find(query)
    .count()
    .then((count) => {
      response.status = 200;
      response.data = count;
      response.message = count;
    })
    .catch((error) => {
      response.status = 500;
      response.data = null;
      response.message = error;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
}

module.exports = {
  getJobs,
  addOneJob,
  getJobById,
  fullUpdateJob,
  partialUpdateJob,
  deleteJobByJobId,
  getTotalJob
}