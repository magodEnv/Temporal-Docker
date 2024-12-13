import{
    getImagenes_,
    saveImagen_,
    updateImagen_,
    deleteImagen_,
    getImagenById_
}from "../persintence/repository/imagen.repository.js";


export async function saveImagen(req, res){
  const { proyecto_id, url } = req.body;
  const imagen = {
      proyecto_id,
      url,
  };
  saveImagen_(imagen).then(
      (data) => {
        res.status(200).json({ status: true, data: data });
      }, (error) => {
        res.status(400).json({ status: false, error: error.message });
      }
    )
}

export async function getImagenes(req, res){
    getImagenes_().then(data => {
        res.status(200).json({status : true, data : data})
      }, error => {
        res.status(400).json({status : false, error : error.message })
      })
}


export async function updateImagen(req, res){
    const { id } = req.params;
    const { proyecto_id, url } = req.body;
    const imagen = {
        id,
        proyecto_id,
        url,
    };
    updateImagen_(imagen).then(
        (msg) => {
          res.status(200).json({ status: true, msg: msg });
        }, (error) => {
          res.status(400).json({ status: false, error: error.message });
        }
      );
}

export async function deleteImagen(req, res){
    const { id } = req.params;
    deleteImagen_(id).then( msg => {
        res.status(200).json({ status: true, msg: msg });
      }, error => {
        res.status(400).json({ status: false, error: error.message });
      }
    );
}

export async function getImagenById(req, res){
    const { id } = req.params;
    getImagenById_(id).then(data => {
        res.status(200).json({ status: true, data: data });
      }, error => {
        res.status(400).json({ status: false, error: error.message });
      }
    );
}