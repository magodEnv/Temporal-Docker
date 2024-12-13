// InvestigadorProyecto.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const InvestigadorProyecto = sequelize.define(
  "investigadores_proyectos",
  {
    proyecto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    investigador_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }

);

