const { Router } = require("express");
const {
  sign,
  detailUser,
  updateUser,
} = require("../controllers/user.controller.js");
const {
  completeNameField,
  completeEmailField,
  completePasswordField,
} = require("../middlewares/global.middleware");
const { validToken } = require("../middlewares/token.middleware");

const route = Router();
route.post(
  "/",
  [completeNameField, completeEmailField, completePasswordField],
  sign
);

route.use(validToken);
route.put(
  "/",
  [completeNameField, completeEmailField, completePasswordField],
  updateUser
);
route.get("/", detailUser);

module.exports = route;
