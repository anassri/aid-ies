'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Categories', [
        {name: 'Paintings', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Sculptures', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Crafts', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Comics', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Clothings', createdAt: new Date(), updatedAt: new Date()},
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
