import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Imagen = sequelize.define(
  "imagenes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "proyectos",
        key: "id",
      },
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
