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

const validarToken = (token) => {
  if (!token) {
    return { status: 401, message: 'Token not found' };
  }
  const response = verificarToken(token);
  return response;
};

const editarPost = async (req, res) => {
  const token = req.headers.authorization;
  const response = validarToken(token);
  if (response.status) {
    return res.status(response.status).json({ message: response.message });
  }
  const { id } = req.params;
  const post = await BlogPostService.pegarPostId(id);
  if (post.status) return res.status(post.status).json({ message: post.message });
  const user = await UserService.pegarUsuarioId(post.userId);
  if (response.data.email !== user.email) { 
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  const editar = req.body;
  const postEdit = await BlogPostService.editarPost(id, editar);
  if (postEdit.status) return res.status(postEdit.status).json({ message: postEdit.message });
  return res.status(200).json(postEdit);
};

const apagarPost = async (req, res) => {
  const token = req.headers.authorization;
  const response = validarToken(token);
  if (response.status) {
    return res.status(response.status).json({ message: response.message });
  }
  const { id } = req.params;
  const post = await BlogPostService.pegarPostId(id);
  if (post.status) return res.status(post.status).json({ message: post.message });
  const user = await UserService.pegarUsuarioId(post.userId);
  if (response.data.email !== user.email) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  const apagar = await BlogPostService.apagarPost(id);
  return res.status(apagar.status).json({ message: apagar.message });
};

module.exports = {
  adicionarPost,
  pegarPosts,
  pegarPostId,
  editarPost,
  apagarPost,
};