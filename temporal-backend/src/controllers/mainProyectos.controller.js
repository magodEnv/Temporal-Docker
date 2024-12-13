import{
    getMainProyectos_,
    saveMainProyectos_,
    deleteMainProyectos_,
    updateMainProyectos_
}from "../persintence/repository/mainProyectos.repository.js";

export async function saveMainProyectos(req, res){
  const { proyecto_id } = req.body;
  const mainProyecto = {
      proyecto_id,
  };
  saveMainProyectos_(mainProyecto).then(
      (data) => {
        res.status(200).json({ status: true, data: data });
      }, (error) => {
        res.status(400).json({ status: false, error: error.message });
      }
    )
}

export async function getMainProyectos(req, res){  
    getMainProyectos_().then(data => {
        res.status(200).json({status : true, data : data})
      }, error => {
        res.status(400).json({status : false, error : error.message })
      })
}

export async function updateMainProyectos(req, res){
    const { id } = req.params;
    const { proyecto_id } = req.body;
    const mainProyecto = {
        id,
        proyecto_id,
    };
    updateMainProyectos_(mainProyecto).then(
        (msg) => {
          res.status(200).json({ status: true, msg: msg });
        }, (error) => {
          res.status(400).json({ status: false, error: error.message });
        }
      );
}

export async function deleteMainProyectos(req, res){
    const { id } = req.params;
    deleteMainProyectos_(id).then( msg => {
        res.status(200).json({ status: true, msg: msg });
      }, error => {
        res.status(400).json({ status: false, error: error.message });
      }
    );
}