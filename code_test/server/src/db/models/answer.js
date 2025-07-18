"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate({ Question }) {
      this.belongsTo(Question, { foreignKey: "question_id" });
    }
  }
  Answer.init(
    {
      answer: DataTypes.STRING,
      question_id: DataTypes.INTEGER,
      correct_answer: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
