import { MainProyectos } from "../models/MainProyectos.js";

export async function getMainProyectos_() {
    try {
        const mainProyectos = await MainProyectos.findAll({
        attributes: [
            "id",
            "proyecto_id",
        ],
        order: [["id", "DESC"]],
        });
        return mainProyectos;
    } catch (error) {
        console.log(error);
        throw new Error("Sucedio un error......");
    }
}

export async function saveMainProyectos_(mainProyecto) {
    console.log("mainProyecto: ", mainProyecto);
    const { proyecto_id } = mainProyecto;
    try {
        const newMainProyecto = await MainProyectos.create({
        proyecto_id,
        });
        return newMainProyecto;
    } catch (error) {
        throw new Error("Sucedio un error......");
    }
}


//Funcion que quizas no sera necesaria:
export async function updateMainProyectos_(mainProyecto) {
    console.log("mainProyecto: ", mainProyecto);
    const { id, proyecto_id } = mainProyecto;
    
    try {
        const mainProyecto_update = await MainProyectos.findByPk(id);
        if (!mainProyecto_update) {
        throw new Error("Proyecto no encontrado.");
        }
        mainProyecto_update.proyecto_id = proyecto_id;
        await mainProyecto_update.save();
        return "Proyecto actualizado";
    } catch (error) {
        throw new Error("Sucedio un error......");
    }
}

export async function deleteMainProyectos_(id) {
    console.log("Eliminando proyectos principales");
    try {
        // Eliminar todos los registros
        const result = await MainProyectos.destroy({
            where: {},  // No especificar condición, eliminamos todos los registros
        });
        if (result === 0) {
            console.log("No hay proyectos principales para eliminar.");
            return "No hay proyectos principales para eliminar."; // Mensaje en caso de no encontrar proyectos
        }
        console.log("Todos los proyectos han sido eliminados.");
        // Resetear el contador de auto-incremento
        

        return "Todos los proyectos han sido eliminados y el contador de IDs ha sido restablecido.";
    } catch (error) {
        throw new Error("Sucedió un error al eliminar los proyectos.");
    }
}