"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({ Game, Answer }) {
      this.belongsTo(Game, { foreignKey: "game_id" });
      this.hasMany(Answer, { foreignKey: "question_id" });
    }
  }
  Question.init(
    {
      question: DataTypes.STRING,
      game_id: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
