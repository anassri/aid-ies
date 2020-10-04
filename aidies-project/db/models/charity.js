'use strict';
module.exports = (sequelize, DataTypes) => {
  const Charity = sequelize.define('Charity', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    bio: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    website: {
      type: DataTypes.STRING,
    },
  }, {});
  Charity.associate = function(models) {
    Charity.hasMany(models.Campaign, { foreignKey: 'charityId', onDelete: 'cascade'})
  };
  return Charity;
};