const { sign, verify } = require("jsonwebtoken");
const { configDotenv } = require("dotenv");
configDotenv();

const createToken = (id) => {
  const token = sign({ id: id }, process.env.tokenPassword, {
    expiresIn: "2h",
  });
  return token;
};

const decodeToken = (token) => {
  try {
    const decode = verify(token, process.env.tokenPassword);
    return decode;
  } catch (err) {
    return false;
  }
};

module.exports = {
  createToken,
  decodeToken,
};
