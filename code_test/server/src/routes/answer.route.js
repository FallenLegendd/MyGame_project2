const answerRouter = require('express').Router()
const AnswerController = require('../controllers/Answer.controller')

answerRouter
    .get('/all', AnswerController.getAll)
    .get('/:id', AnswerController.getAllAnswersForThisQuestion)

module.exports = answerRouter;