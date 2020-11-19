'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ firstName: 'Demo', lastName:'-lition', email: 'demo@example.com', hashedPassword: createPassword(), bio: "this is a demo account for guests", location: 'Atlanta, GA', website: 'http://google.com' }),
      r({ firstName: 'Ammar', lastName: 'Nassri', email: 'ammar@email.com', hashedPassword: createPassword(), bio: "Ammar earned a bachelor's degree in Computer engineering back in 2010. His dedication to following his passion has led him to pursue and earn a Master's degree in Animation from Savannah College of Art and Design in Atlanta. Ammar enjoys crafting stories influenced by his upbringing and country. He also strives to influence his audience by creatively telling stories inspired by true events happening around the world, particularly in political and humanitarian events.", location: 'Atlanta, GA', website: 'http://ammarnassri.com', instagram: 'https://www.instagram.com/arnassri/', facebook:'https://www.facebook.com/AmmarNassri' }),
      r({ firstName: 'Huda', lastName: 'Alghazouli', email: 'huda@email.com', hashedPassword: createPassword(), bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", location: 'Roma, Italy', website: 'http://google.com' }),
      r({ firstName: 'Kareem', lastName: 'Nassri', email: 'kareem@email.com', hashedPassword: createPassword(), bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", location: 'New York, NY', website: 'http://google.com' }),
      r({ firstName: 'John', lastName: 'Doe', email: 'johnd@email.com', hashedPassword: createPassword(), bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", location: 'Los Angeles, CA',website: 'http://google.com' }),
      r({ firstName: 'Will', lastName: 'Smith', email: 'will@email.com', hashedPassword: createPassword(), bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", location: 'Madrid, Spain', website: 'http://google.com', instagram: 'https://www.instagram.com/arnassri/', facebook:'https://www.facebook.com/AmmarNassri' }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
