const GameService = require('../services/Game.service');
const formatResponse = require('../utils/formatResponse');
const { Game } = require ('../db/models')

class GameController {
    static async getAll(req, res) {
    try {
      const games = await GameService.getAll();

      if (games.length === 0) {
        return res.status(200).json(formatResponse(200, 'Данных нет', []));
      }

      return res
        .status(200)
        .json(formatResponse(200, 'Данные успешно получены', games));
    } catch ({ message }) {
      console.log('=============GameController.getAll=============', message);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            'Невалидный id игры',
            null,
            'Невалидный id игры'
          )
        );

    try {
      const game = await GameService.getById(id);

      if (!game) {
        return res
          .status(404)
          .json(
            formatResponse(404, 'Не найдена игра', null, 'Не найдена игра')
          );
      }

      return res
        .status(200)
        .json(
          formatResponse(200, `Данные по игре ${id} успешно получены`, game)
        );
    } catch ({ message }) {
      console.log('=============GameController.getById=============', message);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }

  static async create(req, res) {
    const { user } = res.locals;
    const { isValid, error } = Game.validate(req.body);
    if (!isValid) {
      return res.status(400).json(formatResponse(400, error, null, error));
    }

    try {
      const newGame = await GameService.create({
        ...req.body,
        user_id: user.id,
      });

      if (!newGame)
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'не удалось создать запись в бд',
              null,
              'не удалось создать запись в бд'
            )
          );

      return res
        .status(201)
        .json(formatResponse(201, 'Успешна создана новая игра', newGame));
    } catch ({ message }) {
      console.log('=============GameController.create=============', message);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }
}

module.exports = GameController;