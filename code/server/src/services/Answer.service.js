const { Answer } = require("../db/models")

class AnswerService {
    static async getAll() {
        return await Answer.findAll()
    }

    static async getById(id) {
        return await Answer.findByPk(id)
    }

    static async getAllAnswersForThisQuestion(id){
        return await Answer.findAll({where: {question_id: id}})
    }
}

module.exports = AnswerService;