const { Game } = require ('../db/models')

class GameService {
    static async getAll() {
        return await Game.findAll()
    }

    static async getById(id) {
    return await Game.findByPk(id);
  }

  static async create(data) {
    return await Game.create(data);
  }

  static async bulkCreate(data) {
    return await Game.bulkCreate(data);
  }
}

module.exports = GameService;