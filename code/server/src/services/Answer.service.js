const { Answer } = require("../db/models")

class AnswerService {
    static async getAll() {
        return await Answer.findAll()
    }

    static async getById(id) {
        return await Answer.findByPk(id)
    }

    static async getAllAnswersForThisQuestion(question_id){
        return await Answer.findAll({where:{question_id: question_id}})
    }
}

module.exports = AnswerService;