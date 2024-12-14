import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Twitter = sequelize.define(
  "twitter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "twitter", //Nombre de la tabla aqui, ya que si no existe esta linea la convierte a plural
    timestamps: false,
  }
);
