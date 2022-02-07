const UserService = require('../services/UserService');

const adicionarUsuario = async (req, res) => {
  const user = req.body;
  console.log(user);
  const response = await UserService.adicionarUsuario(user);
  res.status(response.status).json(response);
};

module.exports = {
  adicionarUsuario,
};