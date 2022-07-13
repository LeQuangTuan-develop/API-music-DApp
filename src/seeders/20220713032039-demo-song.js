'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
    async up(queryInterface, Sequelize) {
        var song = []
        for (var i = 0; i < 1000; i++) {
            song.push({
                status: faker.helpers.arrayElement([
                    'PENDING',
                    'REFUSE',
                    'PUBLISH',
                    'HIDE',
                ]),
                lyric: 'abcd',
                musician: faker.name.findName('Joann'),
                name: faker.music.songName() + i,
                lyricRendered:
                    '"songAndChord":[{"lyric": "Kìa con bướm vàng" "chord": "AM  {"lyric": "Kìa con bướm vàng" "chord": "AM   "lyric": "Xòe đôi cánh" "chord": "C  "lyric": "Xòe đôi cánh" "chord": "C]',
                audioUrl:
                    'https://soundcloud.com/noisetimeofficial/guru-josh-project-infinity-noisetime-remix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
                description: 'music to listen sleep',
                lengthSeconds: 10,
                hashtag: '#mtp',
                totalView: faker.random.numeric(4),
                totalStar: faker.random.numeric(),
                categoryId: Math.floor(Math.random() * 100) + 1,
                genreId: Math.floor(Math.random() * 100) + 1,
                userId: Math.floor(Math.random() * 100) + 1,
                deleteAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }
        await queryInterface.bulkInsert('Songs', song)
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Songs', null, {})
    },
}
