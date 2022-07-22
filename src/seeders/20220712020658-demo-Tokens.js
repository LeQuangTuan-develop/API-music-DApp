'use strict';

const  { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    var Tokens =[] 
    for (var i = 0;i < 100;i++) {
      Tokens.push({
        user_id:  null,
        token: null,
        type:  null,
        expires: null,
        blacklisted: null,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
    }
    await queryInterface.bulkInsert('Tokens', Tokens)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Tokens', null, {})
  }
};
