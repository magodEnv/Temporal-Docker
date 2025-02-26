// multer.repository.js
import { 
  uploadImagesLanding,
  uploadImagesPeople,
  uploadImageProjects,
  uploadFiles,
  checkFileExists,
  
} from '../../middlewares/multer-config.js'; // Importamos la configuración de multer
import { fileURLToPath } from 'url';
import path from 'path'; // Importamos el módulo path
import fs from 'fs'; // Importamos el módulo fs
//------------------ Funciones ------------------//

const __filename = fileURLToPath(import.meta.url); // Obtener la ruta del archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio del archivo actual


// Funcion para verificar si existe el archivo
export const fileExistsRepo_ = (req, res) => {
  console.log("Categoria: ", req.body.category);
  const originalFilePath = path.join(__dirname, '../../..', 'public', req.body.category, req.body.file);
  let FilePath = checkFileExists(originalFilePath); // Guardar el nuevo path
  let newFilePath = removeSuffixAndDecrement(FilePath); // Guardar el nuevo path
  //console.log("newFilePath: ", newFilePath);
  //Verifica si el sufijo es 0 para devolver el path original
  const verificar0 = verifica0(newFilePath);
  //console.log("verificar0: ", verificar0);
  if(verificar0){
    const fileOriginal = req.body.category + "/" + req.body.file;
    //console.log("fileOriginal: ", fileOriginal);
    return fileOriginal;
  }
  //console.log("Nuevo path después de checkFileExists: ", newFilePath);
  return newFilePath;  
}

//Funcion para restar el sufijo (la funcion checkFileExists añade un sufijo extra indeseable)
const removeSuffixAndDecrement = (filePath) => {
  const { dir, name, ext } = path.parse(filePath);
  const match = name.match(/\((\d+)\)$/);
  if (match) {
    const suffixNumber = parseInt(match[1], 10); // Obtener el número del sufijo
    const baseName = name.replace(/\(\d+\)$/, ''); // Eliminar el sufijo
    
    // Decrementa el número del sufijo
    const newName = `${baseName}(${suffixNumber - 1})${ext}`;
    return path.join(dir, newName);
  }
  // Si no tiene sufijo, devuelve el path original
  return filePath;
};

//Funcion para verificar si el sufijo es 0 (para archivos que no existen)
const verifica0 = (filePath) => {
  const { dir, name, ext } = path.parse(filePath);
  const match = name.match(/\((\d+)\)$/);
  if (match) {
    const suffixNumber = parseInt(match[1], 10); // Obtener el número del sufijo
    if(suffixNumber === 0){
      return true;
    }
  }
  return false;
}


//------------------ Repositorios ------------------//

// Reposotorio para la carpeta landing
export const uploadImagesLandingRepo_ = (req, res) => {
  uploadImagesLanding.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Image uploaded successfully' });
  });
}

// Repositorio para la carpeta bodega
export const uploadImagesPeopleRepo_ = (req, res) => {
  uploadImagesPeople.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Image uploaded successfully' });
  });
}


// Repositorio para la carpeta projects
export const uploadImageProjectsRepo_ = (req, res) => {
  uploadImageProjects.array('images', 10)(req, res, (err) => {
    if (err) {
      console.error('Error uploading ticket images:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Images uploaded successfully' });
  });
}

// Repositorio para la carpeta uploads
export const uploadFilesRepo_ = (req, res) => {
  uploadFiles.array('images', 10)(req, res, (err) => {
    if (err) {
      console.error('Error uploading uploads files:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Files uploaded successfully' });
  });
}


//Funcion para eliminar un archivo segun su categoria
export const deleteFileRepo_ = (categoria, filename) => {
  const category = categoria;
  if (!category) {
    return new Error("Categoría no proporcionada");
  }
  console.log("Categoria recibida: ", category);

  if(filename === "verde_inicio.jpg" || filename === "profile_default.jpeg" || filename === "project_default.jpeg"){
    return new Error("No se puede eliminar este archivo");
  }

  const filePath = path.join(process.cwd(), `public/${category}`, filename);
  console.log("Ruta del archivo a eliminar: ", filePath);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error al eliminar el archivo: ", err);
    } else {
      console.log("Archivo eliminado con éxito");
    }
  });
};