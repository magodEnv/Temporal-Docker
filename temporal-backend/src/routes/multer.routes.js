// multer.routes.js
import express from 'express';
import { 
    uploadImagesLanding,
    uploadImagesPeople,
    uploadImageProjects,
    uploadDefault,
    fileExists,
    deleteFileRepo
} from '../controllers/multer.controller.js';

const router = express.Router();


// Rutas
router.post('/landing', uploadImagesLanding); //Cargar una sola imagen del landing
router.post('/people', uploadImagesPeople); //Cargar una imagen de un investigador
router.post('/projects', uploadImageProjects); //Cargar varios archivos e imagenes de proyectos
router.post('/uploads', uploadDefault); //Cargar varios archivos e imágenes en la carpeta uploads
router.post('/file-exists', fileExists); // Verificar si existe un archivo
router.post('/delete-file', deleteFileRepo); // Eliminar un archivo

export default router;
