const bcrypt = require("bcrypt");

const comparePassword = async (password, passwordEncrypted) => {
  try {
    const passwordIsValid = await bcrypt.compare(password, passwordEncrypted);
    return passwordIsValid;
  } catch (err) {
    throw err;
  }
};

module.exports = comparePassword;
