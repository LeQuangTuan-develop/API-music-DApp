'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
    async up(queryInterface, Sequelize) {
        var User = []
        for (var i = 0; i < 100; i++) {
            User.push({
                username: faker.name.firstName(),
                password: faker.internet.password(),
                fullName: faker.name.findName(),
                address: faker.address.streetAddress(),
                gender: faker.helpers.arrayElement([0, 1]),
                birthDate: faker.date.birthdate({
                    min: 14,
                    max: 60,
                    mode: 'age',
                }),
                phone: faker.phone.number('+84#########'),
                email: faker.internet.email(),
                avatarUrl: faker.image.avatar(),
                description: null,
                role: faker.helpers.arrayElement(['ADMIN', 'USER']),
                isBlock: faker.helpers.arrayElement([0, 1]),
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }
        await queryInterface.bulkInsert('Users', User)
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {})
    },
}
