const jwt = require('jsonwebtoken');

const UserService = require('../services/UserService');

const secret = 'secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const verificarToken = (token) => {
  try {
    const user = jwt.verify(token, secret, jwtConfig);
    return user;
  } catch (e) {
    return { status: 401, message: 'Expired or invalid token' };
  }
};

const adicionarUsuario = async (req, res) => {
  const user = req.body;
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
  const response = verificarToken(token);
  if (response.status) {
    return res.status(response.status).json({ message: response.message });
  }
  const usuarios = await UserService.pegarUsuarios();
  return res.status(200).json(usuarios);
};

const pegarUsuarioId = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const response = verificarToken(token);
  if (response.status) {
    return res.status(response.status).json({ message: response.message });
  }
  const { id } = req.params;
  const usuario = await UserService.pegarUsuarioId(id);
  if (usuario.status) {
    return res.status(usuario.status).json({ message: usuario.message });
  }
  return res.status(200).json(usuario);
};

const apagarUsuario = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const response = verificarToken(token);
  if (response.status) {
    return res.status(response.status).json({ message: response.message });
  }
  const user = await UserService.pegarUsuarioEmail(response.data.email);
  if (user.status) {
    return res.status(user.status).json({ message: user.message });
  }
  await UserService.apagarUsuario(user.id);
  return res.status(204).json({ message: 'Usuário apagado com sucesso' });
};

module.exports = {
  adicionarUsuario,
  pegarUsuarios,
  pegarUsuarioId,
  apagarUsuario,
};