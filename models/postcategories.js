module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      categoryid: { type: DataTypes.INTEGER, foreignKey: true },
    }, { timestamps: false });
  
    PostCategory.associate = (models) => {
      PostCategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'categories',
      });
    };

  return PostCategory;
};
