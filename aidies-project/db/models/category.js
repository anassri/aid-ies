'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(128),
      unique: true,
    }
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Campaign, { foreignKey: 'categoryId' });
  };
  return Category;
};