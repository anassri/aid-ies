'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Charities', [
        { name: 'Molham Volunteering Team', bio: 'Molham Volunteering Team is a NPO registered in Germany, France, Turkey, Jordan, Sweden, Norway and Canada, brought together by a group of Syrian students. It aims at providing aid to internally displaced persons in Syria and Syrian refugees living in camps of the neighboring countries.', website:'https://molhamteam.com/', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Some Dummy Organization to take your money', bio: "We don't care about anyone we just want your money, dummy!", website:'https://goodluckfindingout.com/', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Legit Organization', bio: 'I swear I am legit', website:'https://legitorganization.com/', createdAt: new Date(), updatedAt: new Date()},
        { name: 'UNRWA', bio: "The United Nations Relief and Works Agency for Palestine Refugees in the Near East is a UN agency that supports the relief and human development of Palestinian refugees.", website:'https://www.unrwa.org/', createdAt: new Date(), updatedAt: new Date()},
        { name: 'National Foundation For Cancer Research', bio: 'The National Foundation for Cancer Research (NFCR) is dedicated to providing scientists in the lab the funding they need to make game-changing discoveries in cancer treatments, detection and, ultimately, a cure for all types of cancer.', website:'https://www.nfcr.org/', createdAt: new Date(), updatedAt: new Date()},
        { name: 'UNHCR', bio: "The United Nations High Commissioner for Refugees is a UN agency mandated to aid and protect refugees, forcibly displaced communities, and stateless people, and to assist in their voluntary repatriation, local integration or resettlement to a third country.", website:'https://www.unhcr.org/en-us/', createdAt: new Date(), updatedAt: new Date()},
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Charities', null, {});
  }
};
