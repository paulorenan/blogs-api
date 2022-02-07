const { Category } = require('../models');

const cadastrarCategoria = async ({ name }) => {
  if (!name) {
    return { status: 400, message: '"name" is required' };
  }
  const category = await Category.create({ name });
  return category;
};

module.exports = {
  cadastrarCategoria,
};  