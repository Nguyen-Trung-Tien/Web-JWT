"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("User", [
      {
        email: "doe@example.com",
        username: "Doe",
        password: "$10$eHC2lsy55DLmycUlc/WW3eurGdgrkfAFbYppL3wLg023DYzxra4xy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "mrew@example.com",
        username: "Mre",
        password: "$10$eHC2lsy55DLmycUlc/WW3eurGdgrkfAFbYppL3wLg023DYzxra4xy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "nen@example.com",
        username: "Nen",
        password: "$10$eHC2lsy55DLmycUlc/WW3eurGdgrkfAFbYppL3wLg023DYzxra4xy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
