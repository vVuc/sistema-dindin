const {
  insertTransactions,
  editTransaction,
  transactionStatementQuery,
  deletingTransaction,
  listingTransactions,
} = require("../repositories/transaction");
const { selectSQL } = require("../repositories/common_queries");

const registerTransaction = async (req, res) => {
  try {
    const transaction = await insertTransactions(req.body, req.id);

    return res.status(201).json(transaction);
  } catch (err) {
    if (err.code === "23503")
      return res.status(404).json({ mensagem: "Categoria não encontrada" });

    return res.status(500).json("Erro interno do servidor");
  }
};
const detailTransaction = async (req, res) => {
  const { id } = req.params;
  const idUser = req.id;
  try {
    const transaction = await selectSQL("transacoes", id);

    if (!transaction)
      return res.status(400).json({ mensagem: "Transação não encontrada" });

    if (transaction.usuario_id !== idUser)
      return res
        .status(401)
        .json({ mensagem: "Voce não pode ver está transação" });

    return res.status(200).json(transaction);
  } catch (err) {
    return res.status(500).json({ mensagem: `Erro interno do servidor` });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const idUser = req.id;
  try {
    const transaction = await deletingTransaction(id, idUser);
    if (!transaction)
      return res.status(400).json({ mensagem: "Transação não encontrada" });

    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ mensagem: `Erro interno do servidor` });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const idUser = req.id;
  try {
    const transaction = await editTransaction(req.body, id, idUser);
    if (transaction === 1)
      return res.status(400).json({ mensagem: "Transação não encontrada" });
    if (!transaction)
      return res.status(401).json({ mensagem: "Transação não encontrada." });

    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ mensagem: `Erro interno do servidor` });
  }
};

const transactionStatement = async (req, res) => {
  const id = req.id;
  try {
    const transactionStatement = await transactionStatementQuery(id);

    return res.status(200).json(transactionStatement);
  } catch (err) {
    return res.status(500).json({ mensagem: `Erro interno do servidor` });
  }
};

const listTransactions = async (req, res) => {
  const id = req.id;
  const { filtro: filter } = req.query;
  const lowerCaseFilter = filter
    ? filter.map((element) => element.toLowerCase())
    : null;
  try {
    const transactions = await listingTransactions(id, lowerCaseFilter);

    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(500).json({ mensagem: `Erro interno do servidor` });
  }
};
module.exports = {
  registerTransaction,
  detailTransaction,
  deleteTransaction,
  updateTransaction,
  transactionStatement,
  listTransactions,
};
