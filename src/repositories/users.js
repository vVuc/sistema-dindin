const { pool } = require("../config/connectDB");
const comparePassword = require("../utils/compareEncryptPassword");

const signUserInDB = async (data) => {
  const { nome, newPassword, email } = data;

  try {
    const query = `
            INSERT INTO usuarios (nome, email, senha)
            VALUES ($1, $2, $3)
            RETURNING *`;

    const client = await pool.query(query, [nome, email, newPassword]);

    return client.rows[0];
  } catch (err) {
    throw err;
  }
};

const pullDataFromDataBaseByLogin = async (email, password) => {
  try {
    const client = await pool.query(
      `
            SELECT *
            FROM usuarios
            WHERE email = $1
        `,
      [email]
    );

    if (client.rowCount < 1) return false;

    const senhaEncrypted = await comparePassword(
      password,
      client.rows[0].senha
    );

    if (!senhaEncrypted) return false;

    return client.rows;
  } catch (err) {
    throw err;
  }
};
const updateUserById = async (id, data) => {
  const { nome, email, senha } = data;
  try {
    const query = `
            UPDATE usuarios
            SET nome  = $1,
                email = $2,
                senha = $3
            WHERE id = $4
            returning *`;

    const client = await pool.query(query, [nome, email, senha, id]);

    return client;
  } catch (err) {
    throw err;
  }
};

const searchCategoriasFromUserById = async (id) => {
  try {
    const client = await pool.query(
      `
            SELECT c.id, c.descricao
            FROM TRANSACOES t
                     JOIN categorias c
                          ON c.id = t.categoria_id
            WHERE usuario_id = $1
        `,
      [id]
    );

    return client;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  signUserInDB,
  pullDataFromDataBaseByLogin,
  updateUserById,
  searchCategoriasFromUserById,
};
