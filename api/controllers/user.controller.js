const mongoose = require("mongoose");
const User = mongoose.model("User");

const response = {
  status: 200,
  message: null,
  data: null
}

const getUsers = function(req, res) {
  User.find()
    .exec()
    .then((users) => {
      response.status = 200;
      response.message = users.length + " user(s) found!";
      response.data = users;
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

const addUser = function(req, res) {
  const newUser = req.body;
  User.create(newUser)
    .then((user) => {
      response.status = 200;
      response.message = "User has been added!";
      response.data = user;
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

const authUser = function(req, res) {
  const authUser = req.body;
  User.findOne({ "username": authUser.username })
    .exec()
    .then((user) => {
      if (user && user.password === authUser.password) {
        response.status = 200;
        response.message = "Login successful!";
        response.data = user;
      } else {
        response.status = 401;
        response.message = "Invalid credentials!";
        response.data = null;
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

module.exports = {
  getUsers,
  addUser,
  authUser
}