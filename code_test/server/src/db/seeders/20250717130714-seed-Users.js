"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "иван_петров",
          email: "123456789",
          password: "11111111",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "анна_сидорова",
          email: "987654321",
          password: "22222222",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "сергей_иванов",
          email: "555555555",
          password: "33333333",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Темы (Games)
    const themes = [
      "Философы",
      "Эльбрус преподаватели",
      "Шахматы",
      "Евгений Онегин",
      "Страны и народы",
      "Жёлтая тема",
    ];
    await queryInterface.bulkInsert(
      "Games",
      themes.map((theme, i) => ({
        theme_name: theme,
        user_id: 1,
        fullGameScore: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );

    // Получаем id тем
    const games = await queryInterface.sequelize.query(
      `SELECT id, theme_name FROM "Games";`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const themeIdMap = {};
    games.forEach((g) => {
      themeIdMap[g.theme_name] = g.id;
    });

    // Реальные вопросы и ответы для всех тем (по 2 на каждую)
    const questionsData = [
      {
        theme: "Философы",
        questions: [
          {
            question: "Кто считается основателем западной философии?",
            score: 100,
            answers: [
              { text: "Фалес", correct: true },
              { text: "Пифагор", correct: false },
              { text: "Сократ", correct: false },
              { text: "Платон", correct: false },
            ],
          },
          {
            question: "Какой философ написал труд 'Государство'?",
            score: 200,
            answers: [
              { text: "Платон", correct: true },
              { text: "Аристотель", correct: false },
              { text: "Сократ", correct: false },
              { text: "Демокрит", correct: false },
            ],
          },
        ],
      },
      {
        theme: "Эльбрус преподаватели",
        questions: [
          {
            question: "Какой сериал любит Даша?",
            score: 100,
            answers: [
              { text: "Как я встретил вашу маму?", correct: false },
              { text: "Друзья", correct: true },
              { text: "Кухня", correct: false },
              { text: "Даша не любит сериалы", correct: false },
            ],
          },
          {
            question: "Что нравится Максу больше всего?",
            score: 200,
            answers: [
              { text: "Создавать папки", correct: false },
              { text: "Создавать папки в папках", correct: false },
              { text: "Создавать папки для папок в папках", correct: false },
              { text: "Сойки", correct: true },
            ],
          },
          {
            question: "Что чаще всего пишут в чате зума на выпускных 3-ей фазы?",
            score: 300,
            answers: [
              { text: "Не слышно!!!", correct: false },
              { text: "Кто отключил звук Дэну?", correct: false },
              { text: "Он дудит или притворяется?", correct: false },
              { text: "Всё выше перечисленное", correct: true },
            ],
          },
          {
            question: "Что вы знаете о Юре?",
            score: 400,
            answers: [
              { text: "Юра по выходным гуляет по горуду с бумажной картой", correct: false },
              { text: "Он кажется жёстким, но в душе зефирка", correct: false },
              { text: "Юра любит студентов Эльбрус", correct: false },
              { text: "Всё выше перечисленное", correct: true },
            ],
          },
          {
            question: "Любимый овощь Дэна?",
            score: 500,
            answers: [
              { text: "Лук", correct: false },
              { text: "Баклажан", correct: false },
              { text: "Огурчик", correct: true },
              { text: "Помидорчик", correct: false },
            ],
          },
        ],
      },
      {
        theme: "Шахматы",
        questions: [
          {
            question:
              "Как называется фигура, которая ходит только по диагонали?",
            score: 100,
            answers: [
              { text: "Слон", correct: true },
              { text: "Конь", correct: false },
              { text: "Ладья", correct: false },
              { text: "Ферзь", correct: false },
            ],
          },
          {
            question: "Сколько клеток на шахматной доске?",
            score: 200,
            answers: [
              { text: "64", correct: true },
              { text: "32", correct: false },
              { text: "100", correct: false },
              { text: "81", correct: false },
            ],
          },
        ],
      },
      {
        theme: "Евгений Онегин",
        questions: [
          {
            question: "Кто автор романа 'Евгений Онегин'?",
            score: 100,
            answers: [
              { text: "А.С. Пушкин", correct: true },
              { text: "М.Ю. Лермонтов", correct: false },
              { text: "И.А. Крылов", correct: false },
              { text: "Н.В. Гоголь", correct: false },
            ],
          },
          {
            question: "Как зовут главную героиню романа?",
            score: 200,
            answers: [
              { text: "Татьяна", correct: true },
              { text: "Ольга", correct: false },
              { text: "Анна", correct: false },
              { text: "Елизавета", correct: false },
            ],
          },
          {
            question: "Как зовут азамата?",
            score: 300,
            answers: [
              { text: "Татьяна", correct: true },
              { text: "Ольга", correct: false },
              { text: "Анна", correct: false },
              { text: "азамат", correct: false },
            ],
          },
        ],
      },
      {
        theme: "Страны и народы",
        questions: [
          {
            question: "Столицей какой страны является Париж?",
            score: 100,
            answers: [
              { text: "Франция", correct: true },
              { text: "Италия", correct: false },
              { text: "Германия", correct: false },
              { text: "Испания", correct: false },
            ],
          },
          {
            question: "В какой стране находится Великая китайская стена?",
            score: 200,
            answers: [
              { text: "Китай", correct: true },
              { text: "Япония", correct: false },
              { text: "Монголия", correct: false },
              { text: "Индия", correct: false },
            ],
          },
        ],
      },
      {
        theme: "Жёлтая тема",
        questions: [
          {
            question: "Какой фрукт жёлтого цвета и популярен во всём мире?",
            score: 100,
            answers: [
              { text: "Банан", correct: true },
              { text: "Яблоко", correct: false },
              { text: "Апельсин", correct: false },
              { text: "Киви", correct: false },
            ],
          },
          {
            question:
              "Какой цвет получается при смешивании красного и зелёного?",
            score: 200,
            answers: [
              { text: "Жёлтый", correct: true },
              { text: "Синий", correct: false },
              { text: "Оранжевый", correct: false },
              { text: "Фиолетовый", correct: false },
            ],
          },
        ],
      },
    ];

    // Вставляем вопросы и ответы
    let allQuestions = [];
    let allAnswers = [];
    questionsData.forEach((themeBlock) => {
      const game_id = themeIdMap[themeBlock.theme];
      themeBlock.questions.forEach((q) => {
        allQuestions.push({
          question: q.question,
          game_id,
          score: q.score,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });
    // Вставляем вопросы
    await queryInterface.bulkInsert("Questions", allQuestions, {
      returning: true,
    });
    // Получаем id вопросов
    const questions = await queryInterface.sequelize.query(
      `SELECT id, question, game_id, score FROM "Questions";`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    questionsData.forEach((themeBlock) => {
      themeBlock.questions.forEach((q) => {
        const questionRow = questions.find(
          (row) =>
            row.question === q.question &&
            row.game_id === themeIdMap[themeBlock.theme] &&
            row.score === q.score
        );
        if (questionRow) {
          q.answers.forEach((a) => {
            allAnswers.push({
              answer: a.text,
              question_id: questionRow.id,
              correct_answer: a.correct,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          });
        }
      });
    });
    await queryInterface.bulkInsert("Answers", allAnswers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Answers", null, {});
    await queryInterface.bulkDelete("Questions", null, {});
    await queryInterface.bulkDelete("Games", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
