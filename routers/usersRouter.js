const express = require("express");
const Router = express.Router();

// Import Controller
const { userController, usersController } = require("./../controllers");

Routes.get("/", usersController.getUsers);

module.exports = Router;
