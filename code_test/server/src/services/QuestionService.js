const { Question, Answer } = require("../db/models");

class QuestionService {
  static async getAllQuestions() {
    console.log("============>>>QuestionService.getAllQuestions<<<========");
    const questions = await Question.findAll();
    return questions;
  }

  static async getOneQuestion(id) {
    console.log("============>>>QuestionService.getOneQuestion<<<========");
    const question = await Question.findByPk(id);
    return question;
  }

  static async getByTheme(game_id) {
    console.log("============>>>QuestionService.getByTheme<<<========");
    const question = await Question.findAll({ where: { game_id } });
    if (!question) {
      return null;
    }
    return question;
  }

  static async checkAnswer(questionId, userAnswer) {
    console.log("============>>>QuestionService.checkAnswer<<<========");
    const question = await Question.findByPk(questionId, {
      include: {
        model: Answer,
        where: { correct_answer: true },
        required: true,
      },
    });

    const correctAnswer = question.Answers[0].answer;
    const userAnswerNormalized = userAnswer.toString().trim().toLowerCase();
    const correctAnswerNormalized = correctAnswer
      .toString()
      .trim()
      .toLowerCase();

    console.log("Comparing answers:", {
      userAnswer: userAnswerNormalized,
      correctAnswer: correctAnswerNormalized,
    });

    return correctAnswerNormalized === userAnswerNormalized;
  }
}

module.exports = QuestionService;
