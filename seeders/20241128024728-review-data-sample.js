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
        user_id: 2,
        forum_id: 1,
        rating: 5,
        comment: "Tutor.in has been a game-changer!  The tutors are incredibly knowledgeable and patient. I've made huge strides in my studies, thanks to their guidance. Highly recommended! ⭐ ⭐ ⭐ ⭐ ⭐",
      },
      {
        user_id: 3,
        forum_id: 1,
        rating: 4,
        comment: "I was struggling with calculus until I found Tutor.in. ➗ The interactive lessons and practice problems have made all the difference. I'm so glad I discovered this platform!",
      },
      {
        user_id: 4,
        forum_id: 1,
        rating: 3,
        comment: "Tutor.in is the perfect place to learn at your own pace.  The flexibility is amazing, and the tutors are always available to answer questions. I've learned so much!",
      },
      {
        user_id: 5,
        forum_id: 2,
        rating: 5,
        comment: "I've tried other online tutoring platforms, but Tutor.in is by far the best.  The tutors are not only experts in their subjects but also great at explaining things in a way that's easy to understand.",
      },
      {
        user_id: 6,
        forum_id: 2,
        rating: 4,
        comment: "I was nervous about taking an online course, but Tutor.in made the transition seamless.  The platform is user-friendly, and the community is supportive. I've made some great friends while learning new skills.",
      },
      {
        user_id: 3,
        forum_id: 2,
        rating: 3,
        comment: "Tutor.in has helped me improve my writing skills tremendously.  The feedback from the tutors is invaluable, and I've become a much more confident writer. ",
      },
      {
        user_id: 4,
        forum_id: 3,
        rating: 5,
        comment: "I was looking for a way to brush up on my Spanish, and Tutor.in was the perfect solution. 🇪🇸 The native-speaking tutors are amazing, and I've made rapid progress. ¡Gracias!",
      },
      {
        user_id: 1,
        forum_id: 3,
        rating: 4,
        comment: "Tutor.in has been a lifesaver! 🆘 I was struggling to keep up with my coursework, but with the help of a tutor, I'm back on track. I'm so grateful for this resource. ",
      },
      {
        user_id: 6,
        forum_id: 3,
        rating: 3,
        comment: "If you're looking for personalized learning, Tutor.in is the way to go.  The tutors are able to identify your strengths and weaknesses and tailor the lessons accordingly. I'm really impressed with this platform.",
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
