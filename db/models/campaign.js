'use strict';
module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('Campaign', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(255),
      unique: true,
    },
    summary: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    story: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    startingPrice: {
      allowNull: false,
      type: DataTypes.STRING
    },
    closingDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    completed: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    charityId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Campaign.associate = function(models) {
    Campaign.belongsTo(models.User, { foreignKey: 'userId' });
    Campaign.belongsTo(models.Charity, { foreignKey: 'charityId' });
    Campaign.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Campaign.belongsToMany(models.User, {
      foreignKey: 'campaignId',
      otherKey: 'userId',
      through: 'Favorite'
    });
    Campaign.hasMany(models.Bid, { foreignKey: "campaignId" });
    /* Campaign.belongsToMany(models.User, {
      foreignKey: 'campaignId',
      otherKey: 'userId',
      through: 'Bids'
    }); */
  };
  return Campaign;
};