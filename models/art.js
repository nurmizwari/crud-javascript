"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    get convertDate() {
      return this.date.toISOString().split("T")[0];
    }
    static alert() {
      return this.findAll({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("id")), "count"],
          [sequelize.fn("MAX", sequelize.col("date")), "max"],
          [sequelize.fn("MIN", sequelize.col("date")), "min"],
        ],
      });
    }
  }
  Art.init(
    {
      name: DataTypes.STRING,
      artist: DataTypes.STRING,
      date: DataTypes.DATE,
      description: DataTypes.TEXT,
      photo: DataTypes.STRING,
      placeOfOrigin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Art",
    }
  );
  return Art;
};
