const router = require("express").Router();
const formatResponse = require("../utils/formatResponse");
const questionRouter = require("./questionRouter");
const gameRouter = require('./game.router');
const answerRouter = require('./answer.route')

router.use("/question", questionRouter);
router.use("/game", gameRouter);
router.use("/answer", answerRouter);

router.use((req, res) => {
  res.status(404).json(formatResponse(404, "Путь не найден"));
});

module.exports = router;
