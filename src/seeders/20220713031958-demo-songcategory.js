'use strict';

const  { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    var Songcategory =[] 
    for (var i = 0;i < 100;i++) {
      Songcategory.push({
        name: faker.music.genre(),
        imageUrl:faker.image.imageUrl(),
      })
      
    }
    await queryInterface.bulkInsert('songcategories', Songcategory)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('songcategories', null, {})
  }
};

