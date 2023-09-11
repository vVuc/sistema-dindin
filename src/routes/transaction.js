const { Router } = require("express");
const {
  registerTransaction,
  detailTransaction,
  deleteTransaction,
  updateTransaction,
  transactionStatement,
  listTransactions,
} = require("../controllers/transaction.controller.js");
const {
  completeAllfieldsTransaction,
  validId,
} = require("../middlewares/global.middleware");
const { validToken } = require("../middlewares/token.middleware");

const route = Router();

route.use(validToken);
route.post("/", completeAllfieldsTransaction, registerTransaction);
route.get("/", listTransactions);
route.get("/extrato", transactionStatement);
route.get("/:id", validId, detailTransaction);
route.delete("/:id", validId, deleteTransaction);
route.put("/:id", [validId, completeAllfieldsTransaction], updateTransaction);

module.exports = route;
