//import { Personas } from "../persintence/models/Personas.js";
import { getPersonas_,
  createPersona_,
  updatePersona_,
  deletePersona_,
  getPersonaById_
} from "../persintence/repository/personas.repository.js";

export async function createPersona(req, res){
  const { name_, grade, institute, correo, rol,
    core_page, description_, photo,} = req.body;
  const persona = {
    name_,
    grade,
    institute,
    correo,
    rol,
    core_page,
    description_,
    photo,
  }
  createPersona_(persona).then(
    (data) => {
      res.status(200).json({ status: true, data: data });
    }, (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  )
}

export async function getPersonas (req, res) {
  //console.log("Hola");
  getPersonas_().then(data => {
    res.status(200).json({status : true, data : data})
  }, error => {
    res.status(400).json({status : false, error : error.message })
  })
};

export async function updatePersona(req, res) {
  const { id } = req.params;
  const { name_, grade, institute, correo, rol,
    core_page, description_, photo,} = req.body;
  const persona = {
    id,
    name_,
    grade,
    institute,
    correo,
    rol,
    core_page,
    description_,
    photo,
  };
  updatePersona_(persona).then(
    (msg) => {
      res.status(200).json({ status: true, msg: msg });
    }, (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

export async function deletePersona(req, res) {
  const { id } = req.params;
  deletePersona_(id).then( msg => {
      res.status(200).json({ status: true, msg: msg });
    }, error => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

export async function getPersonaById(req, res) {
  const { id } = req.params;
  getPersonaById_(id).then(
    (data) => {
      res.status(200).json({ status: true, data: data });
    }, (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

