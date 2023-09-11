const { Router } = require("express");
const { login } = require("../controllers/user.controller");
const {
  completeEmailField,
  completePasswordField,
} = require("../middlewares/global.middleware");

const route = Router();

route.post("/", [completeEmailField, completePasswordField], login);

module.exports = route;
