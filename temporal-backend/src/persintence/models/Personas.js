//Personas.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";



export const Persona = sequelize.define(
  "personas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_: {
      type: DataTypes.STRING,
      allowNull: false, // Aseguramos que no sea nulo
    },
    grade: {
      type: DataTypes.STRING,
    },
    institute: {
      type: DataTypes.STRING,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false, // Aseguramos que no sea nulo
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false, // Aseguramos que no sea nulo
    },
    core_page: {
      type: DataTypes.STRING,
    },
    description_: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

