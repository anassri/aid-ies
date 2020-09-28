'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Favorites', [
        {userId: 2, campaignId: 3, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, campaignId: 5, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, campaignId: 9, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, campaignId: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, campaignId: 2, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, campaignId: 3, createdAt: new Date(), updatedAt: new Date()},
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Favorites', null, {});
  }
};
