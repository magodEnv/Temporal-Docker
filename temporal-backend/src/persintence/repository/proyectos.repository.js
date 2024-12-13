import { Proyecto } from "../models/Proyectos.js";
import models from '../models/index.js'; // Ahora importamos models desde index.js

// Función para obtener todos los proyectos con sus investigadores y imágenes asociadas
export async function getProyectos_() {
  try {
    const proyectos = await Proyecto.findAll({
      include: [
        {
          model: models.InvestigadorProyecto,
          as: 'investigadores', // Alias de la relación con InvestigadorProyecto
          required: false, // Esto asegura que se haga un LEFT JOIN (incluso si no hay investigadores)
          include: [
            {
              model: models.Persona,
              as: 'persona', // Alias para la relación con Persona
              attributes: ['id', 'name_'],
            },
          ],
        },
        {
          model: models.CoreResearchers,
          as: 'coreResearchers', // Alias de la relación con CoreResarchers
          required: false, // Esto asegura que se haga un LEFT JOIN (incluso si no hay investigadores)
          include: [
            {
              model: models.Persona,
              as: 'persona', // Alias para la relación con Persona
              attributes: ['id', 'name_'],
            },
          ],
        },
        {
          model: models.Imagen,
          as: 'imagenes', // Alias para la relación con Imagen
          attributes: ['id', 'url'], // Solo traeremos los atributos relevantes de la imagen
        },
      ],
      order: [['id', 'DESC']], // Ordenar proyectos por ID de forma descendente
    });

    return proyectos;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los proyectos');
  }
}

// Función para crear un proyecto con sus investigadores y/o imágenes asociadas
export async function createProyecto_(proyecto) {
  const { title, subtitle, abstract, description_, start_date, end_date, state_, code_project, core_image, investigadores, coreResearchers, imagenes, imagenes_eliminadas } = proyecto;
  console.log("Datos del proyecto:", proyecto); 
  try {
    // Crear el proyecto
    const validEndDate = isValidDate(end_date) ? end_date : null;

    const newProyecto = await Proyecto.create({
      title, subtitle, abstract, description_, start_date, end_date: validEndDate, state_, code_project, core_image,
    });

    // Relacionar investigadores si se proporcionaron
    if (investigadores && Array.isArray(investigadores) && investigadores.length > 0) {
      const investigadores_proyecto = investigadores.map(investigadorId => ({
        investigador_id: investigadorId,
        proyecto_id: newProyecto.id,
      }));
      await models.InvestigadorProyecto.bulkCreate(investigadores_proyecto,{
        ignoreDuplicates: true,  // Esto asegura que no se insertarán duplicados
      });
    }
    
    // Relacionar CORE investigadores si se proporcionaron
    if (coreResearchers && Array.isArray(coreResearchers) && coreResearchers.length > 0) {
      const coreResearchers_proyecto = coreResearchers.map(investigadorId => ({
        investigador_id: investigadorId,
        proyecto_id: newProyecto.id,
      }));
      await models.CoreResearchers.bulkCreate(coreResearchers_proyecto,
        {
          ignoreDuplicates: true,  // Esto asegura que no se insertarán duplicados
        }
      );
    }

    // Relacionar imágenes si se proporcionaron
    if (imagenes && Array.isArray(imagenes) && imagenes.length > 0) {
      const imagenes_proyecto = imagenes.map(url => ({
        proyecto_id: newProyecto.id,
        url,
      }));
      await models.Imagen.bulkCreate(imagenes_proyecto);
    }

    // Devolvemos el proyecto creado con investigadores e imágenes
    const proyectoConDetalles = await Proyecto.findOne({
      where: { id: newProyecto.id },
      include: [
        {
          model: models.InvestigadorProyecto, //Colaboradores
          as: 'investigadores',
          include: [
            {
              model: models.Persona,
              as: 'persona',
              attributes: ['id', 'name_'],
            },
          ],
        },
        {
          model: models.Imagen,
          as: 'imagenes',
          attributes: ['id', 'url'],
        },
        {
          model: models.CoreResearchers, //Investigadores principales
          as: 'coreResearchers',
          include: [
            {
              model: models.Persona,
              as: 'persona',
              attributes: ['id', 'name_'],
            },
          ],
        },
      ],
    });

    return proyectoConDetalles;
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    throw new Error("Sucedió un error al crear el proyecto.");
  }
}

// Función para actualizar un proyecto con sus investigadores e imágenes
export async function updateProyecto_(proyectoId, proyectoData) {
  const { title, subtitle, abstract, description_, start_date, end_date, state_, code_project, core_image, investigadores, coreResearchers, imagenes, imagenes_eliminadas } = proyectoData;
  
  try {
    // Buscar el proyecto por su ID
    const proyecto = await Proyecto.findByPk(proyectoId);
    if (!proyecto) {
      throw new Error('El proyecto no existe');
    }

    const validEndDate = isValidDate(end_date) ? end_date : null;

    // Actualizar los campos del proyecto
    await proyecto.update({
      title, subtitle, abstract, description_, start_date, end_date: validEndDate, state_, code_project, core_image,
    });

    // Actualizar los investigadores colaboradores
    if (investigadores && Array.isArray(investigadores)) {
      await models.InvestigadorProyecto.destroy({
        where: { proyecto_id: proyecto.id },
      });

      const investigadores_proyecto = investigadores.map(investigadorId => ({
        investigador_id: investigadorId,
        proyecto_id: proyecto.id,
      }));

      await models.InvestigadorProyecto.bulkCreate(investigadores_proyecto, {
        ignoreDuplicates: true,  // Esto asegura que no se insertarán duplicados
      });
    }

    // Actualizar los investigadores principales
    if (coreResearchers && Array.isArray(coreResearchers)) {
      await models.CoreResearchers.destroy({
        where: { proyecto_id: proyecto.id },
      });

      const coreResearchers_proyecto = coreResearchers.map(investigadorId => ({
        investigador_id: investigadorId,
        proyecto_id: proyecto.id,
      }));

      await models.CoreResearchers.bulkCreate(coreResearchers_proyecto, {
        ignoreDuplicates: true,  // Esto asegura que no se insertarán duplicados
      });
    }

    // Actualizar las imágenes asociadas
    if (imagenes_eliminadas && Array.isArray(imagenes_eliminadas)) {
      await models.Imagen.destroy({
        where: {
          url: imagenes_eliminadas,
          proyecto_id: proyecto.id,
        },
      });
    }

    if (imagenes && Array.isArray(imagenes)) {
      const urlsExistentes = await models.Imagen.findAll({
        attributes: ['url'],
      }).then(imagenes => imagenes.map(imagen => imagen.url));

      const imagenesNoExistentes = imagenes.filter(imagen => !urlsExistentes.includes(imagen));

      if (imagenesNoExistentes.length > 0) {
        const imagenes_proyecto = imagenesNoExistentes.map(imagen => ({
          url: imagen,
          proyecto_id: proyecto.id,
        }));

        await models.Imagen.bulkCreate(imagenes_proyecto);
      }
    }

    // Obtener el proyecto actualizado con investigadores e imágenes
    const proyectoActualizado = await Proyecto.findOne({
      where: { id: proyecto.id },
      include: [
        {
          model: models.InvestigadorProyecto,
          as: 'investigadores',
          include: [
            {
              model: models.Persona,
              as: 'persona',
              attributes: ['id', 'name_'],
            },
          ],
        },
        {
          model: models.Imagen,
          as: 'imagenes',
          attributes: ['id', 'url'],
        },
        {
          model: models.CoreResearchers,
          as: 'coreResearchers',
          include: [
            {
              model: models.Persona,
              as: 'persona',
              attributes: ['id', 'name_'],
            },
          ],
        },
      ],
    });

    return proyectoActualizado;
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    throw new Error("Sucedió un error al actualizar el proyecto.");
  }
}

function isValidDate(date) {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()); // Verifica si es un valor de fecha válido
}

export async function deleteProyecto_(id) {
    try {
        await Proyecto.destroy({
            where: { id },
        });
        return "Proyecto eliminado";
    } catch (error) {
        throw new Error("Sucedio un error......");
    }
}



//VERIFICAR SI SE USAN:
export async function getProyectoById_(id) {
    try {
      const proyectos = await Proyecto.findOne({
        where: { id },
        attributes: [
          "id",
          "title",
          "subtitle",
          "abstract",
          "description_",
          "start_date",
          "end_date",
          "code_project",
        ],
      });
      return proyectos;
    } catch (error) {
      throw new Error("Sucedio un error......");
    }
}



export const getPersonasByProyectoId_ = async (proyectoId) => {
  try {
    const proyecto = await models.Proyecto.findOne({
      where: { id: proyectoId },
      include: [{
        model: models.InvestigadorProyecto,
        as: 'investigadores_proyectos', // Asegúrate de que esto coincide con tu asociación
        include: [models.Persona]
      }]
    });

    //console.log("Resultado de la consulta:", proyecto); // Log para verificar la estructura

    if (!proyecto) {
      return []; // Si no hay proyecto, retorna un array vacío
    }

    // Acceso a investigadores_proyectos a través de dataValues
    const investigadores = proyecto.dataValues.investigadores_proyectos;

    // Verifica si hay investigadores y mapealos para obtener las personas
    const personas = investigadores && Array.isArray(investigadores) ? 
      investigadores.map(ip => ip.persona) : [];
    
    return personas; // Retorna las personas asociadas
  } catch (error) {
    console.error('Error al obtener personas por proyecto:', error);
    throw error; // Lanza el error para manejarlo en el controlador
  }
};

//updatePersonasByProyectoId 
export const updatePersonasByProyectoId_ = async (req, res) => {
  const { proyectoId } = req.params;
  const { personas } = req.body;

  // Verifica que el ID no sea undefined
  if (!proyectoId || !personas) {
    return res.status(400).json({ status: false, error: 'El ID del proyecto y las personas son necesarios.' });
  }

  try {
    // Elimina las personas asociadas al proyecto
    await models.InvestigadorProyecto.destroy({
      where: { proyecto_id: proyectoId },
    });

    // Crea las nuevas relaciones
    const investigadores_proyecto = personas.map(personaId => ({
      investigador_id: personaId,
      proyecto_id: proyectoId,
    }));

    await models.InvestigadorProyecto.bulkCreate(investigadores_proyecto);

    return res.status(200).json({ status: true, msg: 'Personas actualizadas.' });
  } catch (error) {
    console.error('Error al actualizar personas por proyecto:', error);
    return res.status(500).json({ status: false, error: error.message });
  }
}

//deletePersonasByProyectoId 
export const deletePersonasByProyectoId_ = async (req, res) => {
  const { proyectoId } = req.params;

  // Verifica que el ID no sea undefined
  if (!proyectoId) {
    return res.status(400).json({ status: false, error: 'El ID del proyecto es necesario.' });
  }

  try {
    const deleted = await models.InvestigadorProyecto.destroy({
      where: { proyecto_id: proyectoId },
    });

    if (deleted) {
      return res.status(200).json({ status: true, msg: 'Personas eliminadas.' });
    }

    return res.status(400).json({ status: false, error: 'No se pudo eliminar a las personas.' });
  } catch (error) {
    console.error('Error al eliminar personas por proyecto:', error);
    return res.status(500).json({ status: false, error: error.message });
  }
}


//createPersonasByProyectoId

export const createPersonaByProyectoId_ = async (req, res) => {
  const { proyectoId } = req.params;
  const { personaId } = req.body;

  // Verifica que el ID no sea undefined
  if (!proyectoId || !personaId) {
    return res.status(400).json({ status: false, error: 'El ID del proyecto y la persona son necesarios.' });
  }

  try {
    // Crea la relación entre la persona y el proyecto
    const investigador_proyecto = await models.InvestigadorProyecto.create({
      investigador_id: personaId,
      proyecto_id: proyectoId,
    });

    // Verifica si se creó la relación
    if (investigador_proyecto) {
      return res.status(201).json({ status: true, msg: 'Relación creada.' });
    }

    // Si no se creó la relación
    return res.status(400).json({ status: false, error: 'No se pudo crear la relación.' });
  } catch (error) {
    console.error('Error al crear la relación:', error);
    return res.status(500).json({ status: false, error: error.message });
  }
}
