const express = require("express");
const app = express();
require("dotenv").config();
require("./api/data/dbconnection");
const routes = require("./api/routes");

app.use(express.json());

app.use("/", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", routes);

const server = app.listen(process.env.PORT, "localhost", function() {
  console.log("Server started at http://localhost:" + server.address().port);
})