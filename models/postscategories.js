module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostCategory',
    {
      postid: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true, autoIncrement: true },
      categoryid: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    }, { timestamps: false, tableName: 'PostsCategories' });
  
    PostsCategory.associate = (models) => {
      PostsCategory.belongsToMany(models.Category, {
        foreignKey: 'categoryId',
        as: 'categories',
        through: 'PostCategory',
      });
      PostsCategory.belongsToMany(models.BlogPost, {
        foreignKey: 'postId',
        as: 'posts',
        through: 'PostCategory',
      });
    };

  return PostsCategory;
};
