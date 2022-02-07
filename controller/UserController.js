const jwt = require('jsonwebtoken');

const UserService = require('../services/UserService');

const secret = 'secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const verificarToken = (token) => {
  try {
    jwt.verify(token, secret, jwtConfig);
    return { status: 200, message: 'OK' };
  } catch (e) {
    return { status: 401, message: 'Expired or invalid token' };
  }
};

const adicionarUsuario = async (req, res) => {
  const user = req.body;
  console.log(user);
  const response = await UserService.adicionarUsuario(user);
  if (response.status !== 200) {
    return res.status(response.status).json({ message: response.message });
  }
  const token = jwt.sign({ data: { 
    email: user.email, 
    password: user.password } }, secret, jwtConfig);
  return res.status(201).json({ token });
};

const pegarUsuarios = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const response = await verificarToken(token);
  if (response.status !== 200) {
    return res.status(response.status).json({ message: response.message });
  }
  const usuarios = await UserService.pegarUsuarios();
  return res.status(200).json(usuarios);
};

module.exports = {
  adicionarUsuario,
  pegarUsuarios,
};