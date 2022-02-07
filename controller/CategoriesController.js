const jwt = require('jsonwebtoken');

const CategoriesService = require('../services/CategoriesService');

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

const cadastrarCategoria = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const response = await verificarToken(token);
  if (response.status !== 200) {
    return res.status(response.status).json({ message: response.message });
  }
  const category = req.body;
  const responseCategory = await CategoriesService.cadastrarCategoria(category);
  if (responseCategory.status) {
    return res.status(responseCategory.status).json({ message: responseCategory.message });
  }
  return res.status(201).json(responseCategory);
};

module.exports = {
  cadastrarCategoria,
};