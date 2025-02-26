// multer.controller.js
import { 
  uploadImagesLandingRepo_,
  uploadImagesPeopleRepo_,
  uploadImageProjectsRepo_,
  uploadFilesRepo_,
  fileExistsRepo_,
  deleteFileRepo_,
} from '../persintence/repository/multer.repository.js';
import { fileURLToPath } from 'url';
import path from 'path'; // Importamos el módulo path


// -------------------- Funciones --------------------

const __filename = fileURLToPath(import.meta.url); // Obtener la ruta del archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio del archivo actual

// Funcion para entregar la ruta relativa del archivo "categoria/archivo.ext"
const getRelativePath = (fullFilePath) => {
  const basePath = path.join(__dirname, '../..', 'public'); 
  return path.relative(basePath, fullFilePath);
}

// Funcion para verificar si existe el archivo
export const fileExists = (req, res) => {
  //console.log('fileExists:', req.body.file);  // Aquí puedes ver los datos de la categoría

  const newFilePath = fileExistsRepo_(req, res);  // Llamas a fileExistsRepo_ y guardas el nuevo path
  //console.log('newFilePath:', newFilePath);  // Aquí puedes ver el nuevo path
  // Obtener la ruta relativa solo desde la carpeta 'public'
  const relativeFilePath = getRelativePath(newFilePath); 
  //console.log('relativeFilePath:', relativeFilePath);  // Aquí puedes ver la ruta relativa
  // Enviar la respuesta con la ruta relativa
  res.json({ newFilePath: relativeFilePath });
}



// -------------------- Controladores --------------------

// Controlador para la carpeta landing
export const uploadImagesLanding = (req, res) => {
  uploadImagesLandingRepo_(req, res);
}

// Controlador para la carpeta people
export const uploadImagesPeople = (req, res) => {
  uploadImagesPeopleRepo_(req, res);
}


// Controlador para la carpeta projects
export const uploadImageProjects = (req, res) => {
  uploadImageProjectsRepo_(req, res);
}

// Controlador para la carpeta uploads
export const uploadDefault = (req, res) => {
  uploadFilesRepo_(req, res);
}

// Controlador para eliminar un archivo

export const deleteFileRepo = (req, res) => {
  const { categoria, filename } = req.body; // Obtén categoría y nombre de archivo del cuerpo de la solicitud

  const result = deleteFileRepo_(categoria, filename); // Llama al repositorio

  if (result instanceof Error) {
    return res.status(400).json({ error: result.message }); // Si hubo un error, devuelves el mensaje
  }
  return res.status(200).json({ message: "Archivo eliminado con éxito" }); // Si todo va bien
};