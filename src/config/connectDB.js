const { Pool } = require("pg");
const { config } = require("dotenv");
config();

const env = process.env;

const pool = new Pool({
  host: env.host,
  user: env.user,
  port: env.port,
  password: env.password,
  database: env.database,
});

module.exports = { pool };
