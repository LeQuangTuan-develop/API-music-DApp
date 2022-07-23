'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
    async up(queryInterface, Sequelize) {
        var song = []
        for (var i = 0; i < 100; i++) {
            song.push({
                name: faker.music.songName(),
                musician: faker.name.findName('Joann'),
                singer: faker.name.findName('Joann'),
                tone: 'Am',
                lyric: faker.lorem.text(),
                status: faker.helpers.arrayElement([
                    'PENDING',
                    'REFUSE',
                    'PUBLISH',
                    'HIDE',
                ]),
                lyricRendered: faker.lorem.text(),
                thumbnail: faker.image.business(),
                audioUrl:
                    'https://soundcloud.com/noisetimeofficial/guru-josh-project-infinity-noisetime-remix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
                description: null,
                lengthSeconds: 5,
                hastag: faker.lorem.word(),
                totalView: faker.random.numeric(4),
                totalStar: faker.random.numeric(),
                categoryId: Math.floor(Math.random() * 50) + 1,
                genreId: Math.floor(Math.random() * 50) + 1,
                userId: Math.floor(Math.random() * 100) + 1,
                deleteAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }
        await queryInterface.bulkInsert('songs', song)
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('songs', null, {})
    },
}
