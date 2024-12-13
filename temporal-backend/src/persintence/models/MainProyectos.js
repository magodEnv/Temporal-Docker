import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const MainProyectos = sequelize.define(
    "mainProyectos",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        proyecto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);