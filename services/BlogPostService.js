const { BlogPost, PostCategory, Category } = require('../models');

const validarTitle = (title) => {
  if (!title) {
    return { status: 400, message: '"title" is required' };
  }
  return { status: 200, message: 'OK' };
};

const validarContent = (content) => {
  if (!content) {
    return { status: 400, message: '"content" is required' };
  }
  return { status: 200, message: 'OK' };
};

const validarCategoryId = async (categoryId) => {
  if (!categoryId) {
    return { status: 400, message: '"categoryIds" is required' };
  }
  const category = categoryId.map(async (id) => {
    const categorys = await Category.findOne({ where: { id } });
    if (!categorys) return { status: 400, message: '"categoryIds" not found' };
    return { status: 200, message: 'OK' };
  });
  if (category.find((cat) => cat.status !== 200)) return category.find((cat) => cat.status !== 200);
  return { status: 200, message: 'OK' };
};

const validacoes = async (title, content, categoryId) => {
  if (validarTitle(title).status !== 200) return validarTitle(title);
  if (validarContent(content).status !== 200) return validarContent(content);
  const category = await validarCategoryId(categoryId);
  if (category.status !== 200) return category;
  return { status: 200, message: 'OK' };
};

const adicionarPost = async (post, userId) => {
  try {
    const { title, content, categoryIds } = post;
    const response = await validacoes(title, content, categoryIds);
    if (response.status !== 200) return response;
    console.log('post', userId);
    const res = await BlogPost
      .create({ title, content, userId, published: new Date(), updated: new Date() });
    categoryIds.forEach(async (categorys) => {
      await PostCategory.create({ postId: res.id, categoryId: categorys });
    });
    return { id: res.id, title, content, userId };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
};

module.exports = {
  adicionarPost,
};