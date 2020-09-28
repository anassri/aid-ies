'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Bids', [
        {bid:'25', userId: 3, campaignId: 1, createdAt: new Date(), updatedAt: new Date()},
        {bid:'30', userId: 5, campaignId: 1, createdAt: new Date(), updatedAt: new Date()},
        {bid:'35', userId: 1, campaignId: 1, createdAt: new Date(), updatedAt: new Date()},
        {bid:'40', userId: 3, campaignId: 1, createdAt: new Date(), updatedAt: new Date()},
        {bid:'45', userId: 3, campaignId: 1, createdAt: new Date(), updatedAt: new Date()},
        {bid:'15', userId:1, campaignId: 2, createdAt: new Date(), updatedAt: new Date()},
        {bid:'20', userId:2, campaignId: 2, createdAt: new Date(), updatedAt: new Date()},
        {bid:'55', userId:2, campaignId: 3, createdAt: new Date(), updatedAt: new Date()},
        {bid:'60', userId:6, campaignId: 3, createdAt: new Date(), updatedAt: new Date()},
        {bid:'65', userId:2, campaignId: 3, createdAt: new Date(), updatedAt: new Date()},
        {bid:'145', userId:5, campaignId:4, createdAt: new Date(), updatedAt: new Date()},
        {bid:'185', userId: 2, campaignId: 5, createdAt: new Date(), updatedAt: new Date()},
        {bid:'305', userId: 2, campaignId: 6, createdAt: new Date(), updatedAt: new Date()},
        {bid:'310', userId: 1, campaignId: 6, createdAt: new Date(), updatedAt: new Date()},
        {bid:'315', userId: 5, campaignId: 6, createdAt: new Date(), updatedAt: new Date()},
        {bid:'320', userId: 4, campaignId: 6, createdAt: new Date(), updatedAt: new Date()},
        {bid:'325', userId: 2, campaignId: 6, createdAt: new Date(), updatedAt: new Date()},
        {bid:'330', userId: 1, campaignId: 6, createdAt: new Date(), updatedAt: new Date()},
        {bid:'125', userId: 5, campaignId: 9, createdAt: new Date(), updatedAt: new Date()},
        {bid:'45', userId: 2, campaignId: 10, createdAt: new Date(), updatedAt: new Date()},
        {bid:'20', userId: 4, campaignId: 11, createdAt: new Date(), updatedAt: new Date()},
        {bid:'25', userId: 5, campaignId: 11, createdAt: new Date(), updatedAt: new Date()},
        {bid:'30', userId: 4, campaignId: 11, createdAt: new Date(), updatedAt: new Date()},
        {bid:'35', userId: 2, campaignId: 11, createdAt: new Date(), updatedAt: new Date()},
        {bid:'40', userId: 5, campaignId: 11, createdAt: new Date(), updatedAt: new Date()},
        {bid:'105', userId: 6, campaignId: 13, createdAt: new Date(), updatedAt: new Date()},
        {bid:'25', userId: 3, campaignId: 15, createdAt: new Date(), updatedAt: new Date()},
        {bid:'30', userId: 5, campaignId: 15, createdAt: new Date(), updatedAt: new Date()},
        {bid:'35', userId: 3, campaignId: 15, createdAt: new Date(), updatedAt: new Date()},
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Bids', null, {});
  }
};
