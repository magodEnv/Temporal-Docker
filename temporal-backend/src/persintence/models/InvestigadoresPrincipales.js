// InvestigadoresPrincipales.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const CoreResearchers = sequelize.define(
    "coreResearchers",
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