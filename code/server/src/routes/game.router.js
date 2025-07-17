const gameRouter = require('express').Router();
const GameController = require('../controllers/Game.controller');
// const verifyAccessToken = require('../middleware/verifyAccessToken');

gameRouter
  .get('/', GameController.getAll)
  .get('/:id', GameController.getById)
  .post('/', GameController.create) //? добавить verifyAccessToken


module.exports = gameRouter;