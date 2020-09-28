'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Campaigns');
  }
};