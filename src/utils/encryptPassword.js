const bcrypt = require("bcrypt");

const encryptPassword = (senha) => {
  return bcrypt.hash(senha, 10);
};
module.exports = { encryptPassword };
