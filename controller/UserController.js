const jwt = require('jsonwebtoken');

const UserService = require('../services/UserService');

const secret = 'secret';

const adicionarUsuario = async (req, res) => {
  const user = req.body;
  console.log(user);
  const response = await UserService.adicionarUsuario(user);
  if (response.status !== 200) {
    return res.status(response.status).json({ message: response.message });
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return res.status(201).json({ token });
};

module.exports = {
  adicionarUsuario,
};