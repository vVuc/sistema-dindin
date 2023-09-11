const {
  signUserInDB,
  pullDataFromDataBaseByLogin,
  searchCategoriasFromUserById,
  updateUserById,
} = require("../repositories/users");
const { encryptPassword } = require("../utils/encryptPassword");
const { createToken } = require("../utils/token");
const { selectSQL } = require("../repositories/common_queries");

const sign = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const newPassword = await encryptPassword(senha);
    const data = { nome, email, newPassword };
    const userCreate = await signUserInDB(data);

    const { senha: _, ...newUserCreate } = userCreate;

    return res.status(201).json(newUserCreate);
  } catch (err) {
    if (err.code === "23505")
      return res.status(401).json({ mensagem: `Email já cadastrado` });

    return res.status(500).json({ mensagem: `Erro interno do servidor` });
  }
};
const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    if (!email || !senha)
      return res.status(400).json({ mensagem: `Preencha todos os campos` });

    const user = await pullDataFromDataBaseByLogin(email, senha);

    if (!user) {
      return res.status(401).json({ mensagem: `Email e/ou senha inválido(s)` });
    }

    const { senha: _, ...client } = user[0];

    const token = createToken(client.id);

    return res.status(201).json({ usuario: client, token });
  } catch (err) {
    return res.status(500).json({ mensagem: `Internal server error` });
  }
};
const detailUser = async (req, res) => {
  const id = req.id;

  try {
    const user = await selectSQL("usuarios", id);

    const { senha: _, ...newUser } = user;

    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json({ mensagem: `Internal server error` });
  }
};
const updateUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const id = req.id;

  try {
    const newPassword = await encryptPassword(senha);

    const data = { nome, email, senha: newPassword };

    const user = await updateUserById(id, data);

    const { senha: _, ...newUser } = user.rows[0];

    return res.status(200).json(newUser);
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ mensagem: "Email já cadastrado" });

    return res.status(500).json({ mensagem: `Internal server error` });
  }
};

const listCategoriesFromUser = async (req, res) => {
  const id = req.id;
  try {
    const client = await searchCategoriasFromUserById(id);
    if (!client) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
    return res.status(200).json(client.rows);
  } catch (err) {
    return res.status(500).json({ mensagem: `Internal server error` });
  }
};
module.exports = {
  sign,
  login,
  detailUser,
  updateUser,
  listCategoriesFromUser,
};
