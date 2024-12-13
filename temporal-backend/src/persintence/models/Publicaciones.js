import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Publicacion = sequelize.define(
	"publicaciones",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		authors: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		year_publi: {
			type: DataTypes.INTEGER,
		},
		url: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: false,
	}
);