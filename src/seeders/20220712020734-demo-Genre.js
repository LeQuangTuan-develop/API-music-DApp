'use strict';

const  { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    var Genre =[] 
    for (var i = 0;i < 100;i++) {
      Genre.push({
        name: faker.music.genre(),
        description:null,
        image_url:faker.image.cats(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
    }
    await queryInterface.bulkInsert('Genres', Genre)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Genres', null, {})
  }
};
