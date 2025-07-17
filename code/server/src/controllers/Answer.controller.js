const AnswerService = require("../services/Answer.service");
const formatResponse = require("../utils/formatResponse");
const { Answer } = require("../db/models");

class AnswerController {
  static async getAll(req, res) {
    try {
      const answers = await AnswerService.getAll();

      if (answers.length === 0) {
        res.status(200).json(formatResponse(200, "Нет ответов", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "Отвутики жы есть!", answers));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Ответы не получены!!", null, message));
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res
        .status(400)
        .json(formatResponse(400, "Фиговый id", null, "Фиговый id"));
    }

    try {
        const answer = AnswerService.getById(id)

        if(!answer) {
            return res.status(200).json(formatResponse(200, "Нет ответа с таким id", []));
        }

        return res
        .status(200)
        .json(formatResponse(200, "Отвутик жы есть!", answer));

    } catch ({message}) {
        res.status(500).json(formatResponse(404, `Ответ с id ${id} не получен`, null, message))
    }
  }

  static async getAllAnswersForThisQuestion(req, res){
    const { id } = req.params

    if(isNaN(+id)){
        return res
        .status(400)
        .json(formatResponse(400, "Фиговый id", null, "Фиговый id"));
    }

    try {
        const answersForThisQuestion = AnswerService.getAllAnswersForThisQuestion(id)

        if(!answersForThisQuestion){
            return res.status(200).json(formatResponse(200, `Нет ответов для вопроса с id ${id}`, []));
        }

        return res
        .status(200)
        .json(formatResponse(200, "Отвутики жы есть!", answersForThisQuestion));

    } catch ({message}) {
        res.status(500).json(formatResponse(404, `Ответ с id ${id} не получен`, null, message))
    }
  }
}


module.exports = AnswerController;