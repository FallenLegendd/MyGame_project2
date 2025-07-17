const router = require("express").Router();
const formatResponse = require("../utils/formatResponse");
const questionRouter = require("./questionRouter");
const gameRouter = require('./game.router');

router.use("/question", questionRouter);
router.use("/game", gameRouter);

router.use((req, res) => {
  res.status(404).json(formatResponse(404, "Путь не найден"));
});

module.exports = router;
