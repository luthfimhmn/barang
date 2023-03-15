'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataProduct = JSON.parse(fs.readFileSync('./data/products.json', {encoding: 'utf-8'}))

    dataProduct.forEach(element => {
      element.updatedAt = new Date();
      element.createdAt = new Date();
    });

    await queryInterface.bulkInsert('products', dataProduct)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})    
  }
};
