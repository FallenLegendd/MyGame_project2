"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate({ User, Question }) {
      this.belongsTo(User, { foreignKey: "user_id" });
      this.hasMany(Question, { foreignKey: "game_id" });
    }
  }
  Game.init(
    {
      theme_name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      fullGameScore: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
