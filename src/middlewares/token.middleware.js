const { decodeToken } = require("../utils/token");
const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (typeof authorization === "undefined")
    return res
      .status(400)
      .json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });

  const [Bearer, token] = authorization.split(" ");

  if (!Bearer || !token)
    return res
      .status(400)
      .json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });

  const validToken = decodeToken(token);

  if (!validToken)
    return res
      .status(401)
      .json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });

  req.id = validToken.id;
  next();
};
module.exports = { validToken };
