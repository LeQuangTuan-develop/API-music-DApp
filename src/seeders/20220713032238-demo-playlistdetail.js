'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        var playlistdetails = []
        for (var i = 0; i < 100; i++) {
            playlistdetails.push({
                playListId: Math.floor(Math.random() * 50) + 1,
                songId: Math.floor(Math.random() * 100) + 1,
            })
        }
        await queryInterface.bulkInsert('playlistdetails', playlistdetails)
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('playlistdetails', null, {})
    },
}
