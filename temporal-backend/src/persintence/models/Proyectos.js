//Proyectos.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Proyecto = sequelize.define(
  "proyectos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Aseguramos que no sea nulo
    },
    subtitle: {
      type: DataTypes.STRING,
    },
    abstract: {
      type: DataTypes.TEXT, // Cambiado a TEXT para mayor longitud
    },
    description_: {
      type: DataTypes.TEXT, // Cambiado a TEXT para mayor longitud
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false, // Aseguramos que no sea nulo
    },
    end_date: {
      type: DataTypes.DATE,
    },
    state_: {
      type: DataTypes.STRING,
      allowNull: false, // Aseguramos que no sea nulo
    },
    code_project: {
      type: DataTypes.INTEGER,
      allowNull: false, // Aseguramos que no sea nulo
    },
    core_image: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
