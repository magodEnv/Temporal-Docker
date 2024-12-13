import {
    getProyectos_,
    createProyecto_,
    updateProyecto_,
    deleteProyecto_,
    getProyectoById_,
    getPersonasByProyectoId_,
    createPersonaByProyectoId_,
    deletePersonasByProyectoId_,
    updatePersonasByProyectoId_,
} from "../persintence/repository/proyectos.repository.js";


export async function createProyecto(req, res) {
    const proyectoData = req.body;  // Obtenemos los datos del cuerpo de la solicitud
  
    try {
      const nuevoProyecto = await createProyecto_(proyectoData);  // Llamamos a la función repository
      res.status(201).json({ status: true, data: nuevoProyecto });  // Devolvemos el proyecto creado
    } catch (error) {
      res.status(400).json({ status: false, error: error.message });
    }
  }



export async function getProyectos(req, res) {
    getProyectos_().then((data) => {
        res.status(200).json({ status: true, data: data });
    }, (error) => {
        res.status(400).json({ status: false, error: error.message });
    });
}



export async function updateProyecto(req, res) {
    const { id } = req.params;  // El ID del proyecto viene de los parámetros de la URL
    const proyectoData = req.body;  // Los nuevos datos del proyecto vienen en el cuerpo de la solicitud
  
    try {
      const proyectoActualizado = await updateProyecto_(id, proyectoData);
      res.status(200).json({ status: true, data: proyectoActualizado });
    } catch (error) {
      res.status(400).json({ status: false, error: error.message });
    }
  }



export async function deleteProyecto(req, res) {
    const { id } = req.params;
    deleteProyecto_(id).then((msg) => {
        res.status(200).json({ status: true, msg: msg });
    }, (error) => {
        res.status(400).json({ status: false, error: error.message });
    });
}

export async function getProyectoById(req, res) {
    const { id } = req.params;
    getProyectoById_(id).then((data) => {
        res.status(200).json({ status: true, data: data });
    }, (error) => {
        res.status(400).json({ status: false, error: error.message });
    });
}

export const getPersonasByProyectoId = async (req, res) => {
    const { proyectoId } = req.params;
  
    // Verifica que el ID no sea undefined
    if (!proyectoId) {
      return res.status(400).json({ status: false, error: 'El ID del proyecto es necesario.' });
    }
  
    try {
      const data = await getPersonasByProyectoId_(proyectoId);
      res.status(200).json({ status: true, data: data });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  };


  
//updatePersonasByProyectoId 
export const updatePersonasByProyectoId = async (req, res) => {
    const { proyectoId } = req.params;
    const { personas } = req.body;
    updatePersonasByProyectoId_(proyectoId, personas).then(
        (data) => {
            res.status(200).json({ status: true, data: data });
        }, (error) => {
            res.status(400).json({ status: false, error: error.message });
        }
    );
}

//deletePersonasByProyectoId 
export const deletePersonasByProyectoId = async (req, res) => {
    const { proyectoId } = req.params;
    deletePersonasByProyectoId_(proyectoId).then(
        (data) => {
            res.status(200).json({ status: true, data: data });
        }, (error) => {
            res.status(400).json({ status: false, error: error.message });
        }
    );
}

//createPersonasByProyectoId 
export const createPersonaByProyectoId = async (req, res) => {
    const { proyectoId } = req.params;
    const { nombre, apellido, email, telefono, direccion, ciudad, pais,} = req.body;
    const persona = {
        nombre,
        apellido,
        email,
        telefono,
        direccion,
        ciudad,
        pais,
    };
    createPersonaByProyectoId_(proyectoId, persona).then(
        (data) => {
            res.status(200).json({ status: true, data: data });
        }, (error) => {
            res.status(400).json({ status: false, error: error.message });
        }
    );
}