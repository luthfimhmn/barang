'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let dataBarang = JSON.parse(fs.readFileSync('./data/barang.json', {encoding: 'utf-8'}))

    dataBarang.forEach(element => {
      element.updatedAt = new Date();
      element.createdAt = new Date();
    });
    await queryInterface.bulkInsert('barangs', dataBarang)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete('barangs',null, {})
  }
};

