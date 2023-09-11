const completeNameField = (req, res, next) => {
  const { nome } = req.body;

  if (!nome)
    return res
      .status(400)
      .json({ mensagem: `Complete todos os campos obrigatórios` });

  next();
};

const completeEmailField = (req, res, next) => {
  const { email } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ mensagem: `Complete todos os campos obrigatórios` });

  next();
};

const completePasswordField = (req, res, next) => {
  const { senha } = req.body;

  if (!senha)
    return res
      .status(400)
      .json({ mensagem: `Complete todos os campos obrigatórios` });

  next();
};

const validId = (req, res, next) => {
  const { id } = req.params;

  if (!Number(id)) return res.status(400).json({ mensagem: `Id inválido` });

  next();
};
const completeAllfieldsTransaction = (req, res, next) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if (Number(valor <= 0))
    return res
      .status(400)
      .json({ mensagem: `O valor precisa ser maior que zero` });

  if (!descricao || !valor || !data || !categoria_id || !tipo)
    return res
      .status(400)
      .json({ mensagem: `Todos os campos obrigatórios devem ser informados.` });

  if (tipo !== "entrada" && tipo !== "saida")
    return res.status(400).json({ mensagem: `Tipo de transação inválido` });

  if (!Number(valor) || !Number(categoria_id))
    return res
      .status(400)
      .json({
        mensagem: `Os campos [valor,categoria_id] devem ser compostos apenas por números!`,
      });

  next();
};

module.exports = {
  completeNameField,
  completeEmailField,
  completePasswordField,
  completeAllfieldsTransaction,
  validId,
};
