'use strict';

const  { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    var User =[] 
    for (var i = 0;i < 100;i++) {
      User.push({
        username: faker.internet.userName(),
        password: faker.internet.password(20, true, /[A-z]/),
        fullname: faker.name.findName(),
        address:  faker.address.streetAddress(),
        gender: faker.helpers.arrayElement([true,false]),
        birthDate:faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        phone: faker.phone.number('84########'),
        email: faker.internet.email(),
        avatarUrl:faker.image.cats(),
        description: 'i am user or admin',
        role:	faker.helpers.arrayElement(['USER', 'ADMIN']),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
    }
    await queryInterface.bulkInsert('Users', User)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {})
  }
};