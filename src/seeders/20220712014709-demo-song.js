'use strict';

const  { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    var song =[] 
    for (var i = 0;i < 100;i++) {
      song.push({
        lyric:  faker.lorem.text(),
        musican: faker.name.findName('Joann'),
        title:faker.music.songName(),
        content_render:  faker.lorem.text(),
        audio_url:  'https://soundcloud.com/noisetimeofficial/guru-josh-project-infinity-noisetime-remix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
        description: null,
        length_seconds:  5,
        hastag:faker.lorem.word() ,
        total_views: faker.random.numeric(4),
        total_star:	 faker.random.numeric(),
        category_id: Math.floor(Math.random()*100)+1 ,
        genre_id: Math.floor(Math.random()*200)+1,
        user_id:  Math.floor(Math.random()*200)+1,
        deleted_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
    }
    await queryInterface.bulkInsert('songs', song) 
     

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('songs', null, {})
  }
};
