const questionRouter = require("express").Router();

const questionController = require("../controllers/questionController");

questionRouter
  .get("/", questionController.getAll)
  .get("/:id", questionController.getOne)
  .get("/theme/:game_id", questionController.getQuestionsByTheme)
  .post("/:id/check", questionController.check);

module.exports = questionRouter;
