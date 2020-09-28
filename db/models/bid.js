'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define('Bid', {
    bid: {
      allowNull: false,
      type: Sequelize.STRING
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    campaignId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
  }, {});
  Bid.associate = function(models) {
    Bid.hasMany
  };
  return Bid;
};