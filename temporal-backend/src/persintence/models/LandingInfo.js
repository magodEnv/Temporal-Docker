import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const LandingInfo = sequelize.define(
    "landingInfo",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        banner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estadoBanner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        bienvenida: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING,
          },
    },
    {
        timestamps: false,
        tableName: 'landingInfo', //Nombre de la tabla aqui, ya que si no existe esta linea la convierte a plural
    }
);