const { pool } = require("../config/connectDB");
const selectSQL = async (table, id) => {
  try {
    const query = `
            SELECT *
            FROM ${table}
            WHERE id = $1`;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  selectSQL,
};
