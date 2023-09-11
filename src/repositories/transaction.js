const { pool } = require("../config/connectDB");
const { selectSQL } = require("./common_queries");
const insertTransactions = async (obj, id) => {
  const { descricao, valor, data, categoria_id, tipo } = obj;
  try {
    const query = `
            INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;

    const transaction = await pool.query(query, [
      descricao,
      valor,
      data,
      categoria_id,
      id,
      tipo,
    ]);

    const category = await selectSQL("categorias", categoria_id);

    return { ...transaction.rows[0], categoria_nome: category.descricao };
  } catch (err) {
    throw err;
  }
};

const editTransaction = async (obj, id, idUser) => {
  const { descricao, valor, data, categoria_id, tipo } = obj;
  try {
    const selectTransaction = await selectSQL("transacoes", id);

    if (!selectTransaction) {
      return false;
    }
    if (selectTransaction.usuario_id !== idUser) return 1;

    const query = `
            UPDATE transacoes
            SET descricao = $1,
                valor = $2,
                data = $3,
                categoria_id = $4,
                tipo = $5
            WHERE id = $6
            RETURNING *
        `;
    const transaction = await pool.query(query, [
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
      id,
    ]);

    return transaction.rows[0];
  } catch (err) {
    throw err;
  }
};

const transactionStatementQuery = async (id) => {
  const queryIncoming = `
        SELECT sum(valor)
        FROM transacoes
        WHERE usuario_id = $1
          AND tipo = 'entrada'
    `;
  const queryOutcoming = `
        SELECT sum(valor)
        FROM transacoes
        WHERE usuario_id = $1
          AND tipo = 'saida'
    `;
  try {
    const incoming = await pool.query(queryIncoming, [id]);
    const outcoming = await pool.query(queryOutcoming, [id]);

    const obj = {
      entrada: incoming.rows[0].sum === null ? 0 : Number(incoming.rows[0].sum),
      saida: outcoming.rows[0].sum === null ? 0 : Number(outcoming.rows[0].sum),
    };

    return obj;
  } catch (err) {
    throw err;
  }
};

const deletingTransaction = async (id, idUser) => {
  const query = `
        DELETE FROM transacoes
        WHERE usuario_id = $1 AND id = $2
        RETURNING *
    `;
  try {
    const deletedTransaction = await pool.query(query, [idUser, id]);

    if (deletedTransaction.rowCount < 1) return false;

    return true;
  } catch (err) {
    throw err;
  }
};

const listingTransactions = async (id, filter) => {
  const query = `
        SELECT *, c.descricao as categoria_nome 
        FROM categorias c
        JOIN transacoes t
        ON t.categoria_id = c.id
        WHERE usuario_id = $1
    `;

  try {
    const transactions = await pool.query(query, [id]);
    let filterObject = [];

    if (filter) {
      transactions.rows.map((element) => {
        if (filter.includes(element.categoria_nome.toLowerCase())) {
          return filterObject.push(element);
        }
      });
    }
    return filter ? filterObject : transactions.rows;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  insertTransactions,
  editTransaction,
  transactionStatementQuery,
  deletingTransaction,
  listingTransactions,
};
