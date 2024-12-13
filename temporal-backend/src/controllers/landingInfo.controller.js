import{
    getLandingInfo_,
    updateLandingInfo_
} from "../persintence/repository/landingInfo.repository.js";


export async function getLandingInfo(req, res){
    getLandingInfo_().then(data => {
        res.status(200).json({status : true, data : data})
      }, error => {
        res.status(400).json({status : false, error : error.message })
      })
}


export async function updateLandingInfo(req, res){
    const { id } = req.params;
    const { banner, estadoBanner, bienvenida, imagen } = req.body;
    const landingInfo = {
        id,
        banner,
        estadoBanner,
        bienvenida,
        imagen,
    };
    updateLandingInfo_(landingInfo).then(
        (msg) => {
          res.status(200).json({ status: true, msg: msg });
        }, (error) => {
          res.status(400).json({ status: false, error: error.message });
        }
      );
}