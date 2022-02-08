const jwt = require('jsonwebtoken');

const BlogPostService = require('../services/BlogPostService');
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

const adicionarPost = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const response = verificarToken(token);
  if (response.status) {
    return res.status(response.status).json({ message: response.message });
  }
  const category = req.body;
  const { id } = await UserService.pegarUsuarioEmail(response.data.email); 
  const responseCategory = await BlogPostService.adicionarPost(category, id);
  if (responseCategory.status) {
    return res.status(responseCategory.status).json({ message: responseCategory.message });
  }
  return res.status(201).json(responseCategory);
};

const pegarPosts = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const response = verificarToken(token);
  if (response.status) {
    return res.status(response.status).json({ message: response.message });
  }
  const responsePosts = await BlogPostService.pegarPosts();
  if (responsePosts.status) {
    return res.status(responsePosts.status).json({ message: responsePosts.message });
  }
  return res.status(200).json(responsePosts);
};

const pegarPostId = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const response = verificarToken(token);
  if (response.status) {
    return res.status(response.status).json({ message: response.message });
  }
  const { id } = req.params;
  const responsePost = await BlogPostService.pegarPostId(id);
  if (responsePost.status) {
    return res.status(responsePost.status).json({ message: responsePost.message });
  }
  return res.status(200).json(responsePost);
};

module.exports = {
  adicionarPost,
  pegarPosts,
  pegarPostId,
};