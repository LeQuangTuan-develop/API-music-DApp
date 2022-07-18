'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [{
      content:  null,
      imageUrl: null,
      star:  null,
      status: null,
      parentId: null,
      created_at: new Date(),
      updated_at: new Date(),
      songId: null,
      userId:null
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Comments', null, {})
  }
};
