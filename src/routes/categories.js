const { Router } = require("express");
const { listCategoriesFromUser } = require("../controllers/user.controller");
const { validToken } = require("../middlewares/token.middleware");

const route = Router();

route.use(validToken);
route.get("/", listCategoriesFromUser);

module.exports = route;
