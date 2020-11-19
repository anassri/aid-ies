'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define('Bid', {
    bid: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    campaignId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Bid.associate = function(models) {
    Bid.belongsTo(models.Campaign, { foreignKey: "campaignId" });
    Bid.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Bid;
};