module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostCategory',
    {
      postid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      categoryid: { type: DataTypes.INTEGER, foreignKey: true },
    }, { timestamps: false, tableName: 'PostsCategories' });
  
    PostsCategory.associate = (models) => {
      PostsCategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'categories',
      });
    };

  return PostsCategory;
};
