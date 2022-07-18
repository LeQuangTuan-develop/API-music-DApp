'use strict';

const  { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    var Playlist =[] 
    for (var i = 0;i < 50;i++) {
      Playlist.push({
        userId: Math.floor(Math.random()*100)+1 ,
        title:'POPS',
        description:faker.commerce.productDescription(),
        status:faker.helpers.arrayElement([0,1]),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
    }
    await queryInterface.bulkInsert('playlists', Playlist)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('playlists', null, {})
  }
};
