'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('reviews', [
      {
        user_id: 1,
        forum_id: 1,
        rating: 5,
        comment: 'Materi sangat mudah dipahami',
      },
      {
        user_id: 2,
        forum_id: 1,
        rating: 4,
        comment: 'Materi cukup mudah dipahami',
      },
      {
        user_id: 3,
        forum_id: 1,
        rating: 3,
        comment: 'Materi agak sulit dipahami',
      },
      {
        user_id: 1,
        forum_id: 2,
        rating: 5,
        comment: 'Materi sangat mudah dipahami',
      },
      {
        user_id: 2,
        forum_id: 2,
        rating: 4,
        comment: 'Materi cukup mudah dipahami',
      },
      {
        user_id: 3,
        forum_id: 2,
        rating: 3,
        comment: 'Materi agak sulit dipahami',
      },
      {
        user_id: 1,
        forum_id: 3,
        rating: 5,
        comment: 'Materi sangat mudah dipahami',
      },
      {
        user_id: 2,
        forum_id: 3,
        rating: 4,
        comment: 'Materi cukup mudah dipahami',
      },
      {
        user_id: 3,
        forum_id: 3,
        rating: 3,
        comment: 'Materi agak sulit dipahami',
      }, {
        user_id: 1,
        forum_id: 4,
        rating: 5,
        comment: 'Materi sangat mudah dipahami',
      },
      {
        user_id: 2,
        forum_id: 4,
        rating: 4,
        comment: 'Materi cukup mudah dipahami',
      },
      {
        user_id: 3,
        forum_id: 4,
        rating: 3,
        comment: 'Materi agak sulit dipahami',
      }
    ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('reviews', null, {});
  }
};
