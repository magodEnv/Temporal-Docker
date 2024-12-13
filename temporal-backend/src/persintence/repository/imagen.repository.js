import { Imagen } from "../models/Imagen.js";

export async function getImagenes_() {
  try {
    const imagenes = await Imagen.findAll({
      attributes: [
        "id",
        "proyecto_id",
        "url",
      ],
      order: [["id", "DESC"]],
    });
    return imagenes;
  } catch (error) {
    console.log(error);
    throw new Error("Sucedió un error al obtener las imágenes.");
  }
}

export async function saveImagen_(imagen) {
  const { proyecto_id, url } = imagen;
  try {
    const newImagen = await Imagen.create({
      proyecto_id,
      url,
    });
    return newImagen;
  } catch (error) {
    throw new Error("Sucedió un error al crear la imagen.");
  }
}

export async function updateImagen_(imagen) {
  const { id, proyecto_id, url } = imagen;
  try {
    const imagen_update = await Imagen.findByPk(id);
    if (!imagen_update) {
      throw new Error("Imagen no encontrada.");
    }
    imagen_update.proyecto_id = proyecto_id;
    imagen_update.url = url;
    await imagen_update.save();
    return "Imagen actualizada";
  } catch (error) {
    throw new Error("Sucedió un error al actualizar la imagen.");
  }
}

export async function deleteImagen_(id) {
  try {
    const result = await Imagen.destroy({
      where: { id },
    });
    if (result === 0) {
      throw new Error("Imagen no encontrada.");
    }
    return "Imagen eliminada";
  } catch (error) {
    throw new Error("Sucedió un error al eliminar la imagen.");
  }
}

export async function getImagenById_(id) {
  try {
    const imagen = await Imagen.findOne({
      where: { id },
      attributes: [
        "id",
        "proyecto_id",
        "url",
      ],
    });
    if (!imagen) {
      throw new Error("Imagen no encontrada.");
    }
    return imagen;
  } catch (error) {
    throw new Error("Sucedió un error al obtener la imagen.");
  }
}
