const router = require("express").Router();
const jobController = require("../controllers/job.controller");
const userController = require("../controllers/user.controller");

router.route("/jobs")
  .get(jobController.getJobs)
  .post(jobController.addOneJob);

router.route("/jobs/count")
  .get(jobController.getTotalJob);

router.route("/jobs/search")
  .get(jobController.searchJobByLocation);

  router.route("/jobs/filter")
  .get(jobController.filterByDate);

router.route("/jobs/:jobId")
  .get(jobController.getJobById)
  .put(jobController.fullUpdateJob)
  .patch(jobController.partialUpdateJob)
  .delete(jobController.deleteJobByJobId);

router.route("/users")
  .get(userController.getUsers)
  .post(userController.addUser);

router.route("/auth")
  .post(userController.authUser);

module.exports = router;