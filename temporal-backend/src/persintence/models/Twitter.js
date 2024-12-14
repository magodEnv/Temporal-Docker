import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Twitter = sequelize.define(
    "twitter",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        tableName: 'twitter', //Nombre de la tabla aqui, ya que si no existe esta linea la convierte a plural
    }
);