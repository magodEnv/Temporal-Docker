import { Publicacion } from "../models/Publicaciones.js";

import models from "../models/index.js";

// Crear una nueva publicación si no existe con el mismo título

export async function createPublicacion_(data) {
	try {
		const existingPublication = await Publicacion.findOne({
			where: { title: data.title },
		});

		if (existingPublication) {
			throw new Error("Publication already exists");
		}
		const publicacion = await Publicacion.create(data);
		return publicacion;
	} catch (error) {
		console.error("Error al crear publicación:", error);
		throw error;
	}
}

// Obtener todas las publicaciones
export async function getPublicaciones_() {
	try {
		console.log(JSON.stringify(Publicacion.findAll()));
		return await Publicacion.findAll();
	} catch (error) {
		console.error("Error al obtener publicaciones:", error);
		throw error;
	}
}

// Obtener una publicación por ID
export async function getPublicacionById_(id) {
	try {
		return await Publicacion.findByPk(id);
	} catch (error) {
		console.error("Error al obtener la publicación por ID:", error);
		throw error;
	}
}
// Actualizar una publicación
export async function updatePublicacion_(id, data) {
	try {
		const publicacion = await Publicacion.findByPk(id);
		if (!publicacion) {
			throw new Error("Publicación no encontrada");
		}
		await publicacion.update(data);
		return publicacion;
	} catch (error) {
		console.error("Error al actualizar publicación:", error);
		throw error;
	}
}

// Eliminar una publicación
export async function deletePublicacion_(id) {
	try {
		const publicacion = await Publicacion.findByPk(id);
		if (!publicacion) {
			throw new Error("Publicación no encontrada");
		}
		await publicacion.destroy();
		return { message: "Publicación eliminada" };
	} catch (error) {
		console.error("Error al eliminar publicación:", error);
		throw error;
	}
}