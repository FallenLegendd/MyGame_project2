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
      "Эльбрус студенты",
      "Эльбрус преподаватели",
      "Шахматы",
      "Евгений Онегин",
      "Страны и народы",
      "Цитаты Макса Стетхэма. Дополни",
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
        theme: "Эльбрус студенты",
        questions: [
          {
            question: "Что заставило Артура задуматься над открытием ларька с кукурузой?",
            score: 100,
            answers: [
              { text: "Redux", correct: true },
              { text: "Азамат", correct: false },
              { text: "Большая прибыль", correct: false },
              { text: "Кукуруза это вкусно", correct: false },
            ],
          },
          {
            question: "Кто больше всего пострадал во время обучения?",
            score: 200,
            answers: [
              { text: "Правая рука Сани", correct: false },
              { text: "Левая нога Сани", correct: false },
              { text: "Правая нога Сани", correct: true },
              { text: "Левая рука Сани", correct: false },
            ],
          },
          {
            question: "Чего стоит боятся студента 1 фазы",
            score: 300,
            answers: [
              { text: "React", correct: false },
              { text: "Redux", correct: false },
              { text: "Юры", correct: false },
              { text: "Всего", correct: true },
            ],
          },
          {
            question: "Что говорит Алёна в любой непонятной ситуации",
            score: 400,
            answers: [
              { text: "Пум-пум-пум", correct: false },
              { text: "Same", correct: true },
              { text: "Спасите", correct: false },
              { text: "Спасите-помогите", correct: false },
            ],
          },
          {
            question: "Сколько Кирилу лет",
            score: 500,
            answers: [
              { text: "8", correct: false },
              { text: "25", correct: false },
              { text: "1347 от рождества христова", correct: true },
              { text: "31 век", correct: false },
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
          {
            question: "Самая сильная фигура в шахматных войсках?",
            score: 300,
            answers: [
              { text: "Слон", correct: false },
              { text: "Ладья", correct: false },
              { text: "Ферзь ", correct: true },
              { text: "Пешка", correct: false },
            ],
          },
          {
            question: "В каком веке появились шахматы?",
            score: 400,
            answers: [
              { text: "в 7-ом веке", correct: false },
              { text: "в 4-ом веке", correct: false },
              { text: "в 6-ом веке", correct: false },
              { text: "в 5-ом веке", correct: true },
            ],
          },
          {
            question: "Шахматная фигура, которая соединяет свойства слона и ладьи?",
            score: 500,
            answers: [
              { text: "Ферзь ", correct: true },
              { text: "Пешка", correct: false },
              { text: "Конь", correct: false },
              { text: "Король", correct: false },
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
              { text: "Япония", correct: false },
              { text: "Монголия", correct: false },
              { text: "Китай", correct: true },
              { text: "Индия", correct: false },
            ],
          },
          {
            question: "Сколько дней Земля делает оборот вокруг Солнца?",
            score: 300,
            answers: [
              { text: "215 дней", correct: false },
              { text: "371 день", correct: false },
              { text: "362 дня", correct: false },
              { text: "365 день, 5 часа, 59 минут и 16 секунды", correct: true },
            ],
          },
           {
            question: "Столицей какого европейского государства является город Вена?",
            score: 400,
            answers: [
              { text: "Дания", correct: false },
              { text: "Австрия", correct: true },
              { text: "Италия", correct: false },
              { text: "Швейцария", correct: false },
            ],
          },
          {
            question: "В какой европейской стране находится город Амстердам?",
            score: 400,
            answers: [
              { text: "Швейцария", correct: false },
              { text: "Дания", correct: false },
              { text: "Швеция", correct: false },
              { text: "Нидерланды", correct: true },
            ],
          },
        ],
      },
      {
        theme: "Цитаты Макса Стетхэма. Дополни",
        questions: [
          {
            question: "В жизни всегда есть две дороги...",
            score: 100,
            answers: [
              { text: "одна - первая, а другая - вторая", correct: true },
              { text: "Левая и правая", correct: false },
              { text: "Вперед и назад", correct: false },
              { text: "Киви", correct: false },
            ],
          },
          {
            question:
              "В пиве мало витаминов, поэтому...",
            score: 200,
            answers: [
              { text: "его пить не стоит", correct: false },
              { text: "лучше съесть яблоко", correct: false },
              { text: "лучше бахнуть водички", correct: false },
              { text: "Его надо пить много", correct: true },
            ],
          },
          {
            question:
              "Однажды...",
            score: 300,
            answers: [
              { text: "жЫ есть", correct: false },
              { text: "я ушел..", correct: false },
              { text: "дважды не бывает", correct: true },
              { text: "и не врнулся", correct: false },
            ],
          },
          {
            question:
              "Они говорили, что жизнь - это вызов, я сказал...",
            score: 400,
            answers: [
              { text: "жЫ есть", correct: false },
              { text: "что перезвоню", correct: true },
              { text: "что я звоню", correct: false },
              { text: "что ухожу", correct: false },
            ],
          },
          {
            question:
              "Я скажу вам 2 фразы, которые откроют перед вами все двери...",
            score: 500,
            answers: [
              { text: "выход", correct: false },
              { text: "от себя и на себя", correct: true },
              { text: "сезам откройся", correct: false },
              { text: "вход", correct: false },
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
