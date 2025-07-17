'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'иван_петров',
        email: '123456789', // В вашей схеме email как BIGINT, поэтому число
        password: '11111111', // Пароль как BIGINT
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'анна_сидорова',
        email: '987654321',
        password: '22222222',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'сергей_иванов',
        email: '555555555',
        password: '33333333',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    

    await queryInterface.bulkInsert('Games', [
      {
        theme_name: 'История России',
        user_id: 1,
        fullGameScore: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        theme_name: 'География мира',
        user_id: 2,
        fullGameScore: 92,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        theme_name: 'Литература XIX века',
        user_id: 3,
        fullGameScore: 78,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

   

    await queryInterface.bulkInsert('Questions', [
      {
        question: 'В каком году началась Первая мировая война?',
        game_id: 1,
        score: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Столица Бразилии?',
        game_id: 2,
        score: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Кто написал "Войну и мир"?',
        game_id: 3,
        score: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});


    await queryInterface.bulkInsert('Answers', [
      {
        answer: '1914',
        question_id: 1,
        correct_answer: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        answer: '1918',
        question_id: 2,
        correct_answer: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        answer: 'Бразилиа',
        question_id: 3,
        correct_answer: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        answer: 'Рио-де-Жанейро',
        question_id: 1,
        correct_answer: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        answer: 'Лев Толстой',
        question_id: 2,
        correct_answer: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        answer: 'Фёдор Достоевский',
        question_id: 3,
        correct_answer: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Answers', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Games', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};