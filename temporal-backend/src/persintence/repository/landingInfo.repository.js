import { LandingInfo } from '../models/LandingInfo.js';

//Obtiene la información del landing
export async function getLandingInfo_() {
    try {
        const landingInfo = await LandingInfo.findAll({
            attributes: [
                'id',
                'banner',
                'estadoBanner',
                'bienvenida',
                'imagen',
            ],
            order: [['id', 'DESC']],
        });
        return landingInfo;
    }
    catch (error) {
        console.log(error);
        throw new Error('Sucedió un error al obtener la información de la landing.');
    }
}

//Actualiza la informacion del Landing
export async function updateLandingInfo_(landingInfo) {
    //console.log("Landingpre : ",landingInfo);
    const { banner, estadoBanner, bienvenida, imagen } = landingInfo;
    
    //console.log("Landing: ",landingInfo);
    try {
        const landingInfo_update = await LandingInfo.findByPk(1);
        if (!landingInfo_update) {
            throw new Error('Información del landing no encontrada.');
        }
        landingInfo_update.banner = banner;
        landingInfo_update.estadoBanner = estadoBanner;
        landingInfo_update.bienvenida = bienvenida;
        landingInfo_update.imagen = imagen;
        await landingInfo_update.save();
        return{
            message: 'Información del landing actualizada con éxito.',
            data: landingInfo_update
        };
    }
    catch (error) {
        throw new Error('Sucedió un error al actualizar la información del landing.');
    }
}