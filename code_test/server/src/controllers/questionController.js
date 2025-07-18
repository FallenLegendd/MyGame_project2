const QuestionService = require("../services/QuestionService");
const formatResponse = require("../utils/formatResponse");

class QuestionController {
  static async getAll(req, res) {
    try {
      const result = await QuestionService.getAllQuestions();
      res
        .status(200)
        .json(formatResponse(200, "Все вопросы получены", result, null));
    } catch (error) {
      console.log("============>>>QuestionController.getAll<<<========", error);
      res
        .status(500)
        .json(
          formatResponse(
            500,
            "Не удалось получить все вопросы",
            null,
            error.message
          )
        );
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const result = await QuestionService.getOneQuestion(id);
      res
        .status(200)
        .json(formatResponse(200, "Получен один вопрос", result, null));
    } catch (error) {
      console.log("============>>>QuestionController.getOne<<<========", error);
      res
        .status(500)
        .json(
          formatResponse(
            500,
            "Не удалось получить один вопров",
            null,
            error.message
          )
        );
    }
  }

  static async getQuestionsByTheme(req, res) {
    try {
      const { game_id } = req.params;

      const gameId = parseInt(game_id);
      if (isNaN(gameId)) {
        return res
          .status(400)
          .json(formatResponse(400, "game_id должен быть числом", null, null));
      }

      const result = await QuestionService.getByTheme(gameId);

      if (!result || result.length === 0) {
        return res
          .status(404)
          .json(formatResponse(404, "Вопросы не найдены", null, null));
      }

      res
        .status(200)
        .json(formatResponse(200, "Вопросы по теме получены", result, null));
    } catch (error) {
      console.error("QuestionController.getQuestionsByTheme:", error);
      res
        .status(500)
        .json(
          formatResponse(
            500,
            "Ошибка при получении вопросов",
            null,
            error.message
          )
        );
    }
  }

  static async check(req, res) {
    try {
      const { id } = req.params;
      const { answer } = req.body;

      if (!answer) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "Поле 'answer' обязательно",
              null,
              "Поле 'answer' обязательно"
            )
          );
      }

      const isCorrect = await QuestionService.checkAnswer(id, answer);
      res
        .status(200)
        .json(formatResponse(200, "Ответ проверен", { isCorrect }, null));
    } catch (error) {
      console.error("QuestionController.check:", error);
      res
        .status(500)
        .json(
          formatResponse(500, "Ошибка при проверке ответа", null, error.message)
        );
    }
  }
}

module.exports = QuestionController;
