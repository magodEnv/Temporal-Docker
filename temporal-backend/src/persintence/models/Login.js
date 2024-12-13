// Login.js

import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Login = sequelize.define(
    "login",
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'login',
    }
);