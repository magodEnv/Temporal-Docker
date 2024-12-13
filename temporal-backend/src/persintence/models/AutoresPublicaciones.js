// AutoresPublicaciones.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const AutoresPublicaciones = sequelize.define(
  "autores_publicaciones",
  {
    publicacion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    autor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }

);

