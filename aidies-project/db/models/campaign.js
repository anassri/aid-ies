'use strict';
module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('Campaign', {
    name: {
      allowNull: false,
      type: Sequelize.STRING(255),
      unique: true,
    },
    summary: {
      allowNull: false,
      type: Sequelize.STRING(255),
    },
    image: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    story: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    startingPrice: {
      allowNull: false,
      type: Sequelize.STRING
    },
    closingDate: {
      allowNull: false,
      type: Sequelize.DATE
    },
    completed: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
    location: {
      allowNull: false,
      type: Sequelize.STRING
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    charityId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    categoryId: {
      allowNull: false,
      type: Sequelize.INTEGER
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
    Campaign.belongsToMany(models.User, {
      foreignKey: 'campaignId',
      otherKey: 'userId',
      through: 'Bids'
    });
  };
  return Campaign;
};