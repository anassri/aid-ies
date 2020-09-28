'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    campaignId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
  };
  return Favorite;
};