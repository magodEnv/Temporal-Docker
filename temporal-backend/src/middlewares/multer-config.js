//multer-config.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';


// ----------------- Funciones auxiliares -----------------//

const __filename = fileURLToPath(import.meta.url); // Obtener la ruta del archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio del archivo actual

// Función para definir la carpeta de destino según el tipo de archivo 
const getDestinationFolder = (categoria, file, cb) => {
  const category = categoria;
  if (!category) {
    return cb(new Error("Categoría no proporcionada"), false);
  }
  console.log("Categoria recibida: ", category);

  // Lógica para elegir la carpeta de destino
  let destinationFolder = path.join(__dirname, '../..', 'public', 'uploads');
  switch (category) {
    case "landing":
      destinationFolder = path.join(__dirname, '../..', 'public', 'landing');
      break;
    case "people":
      destinationFolder = path.join(__dirname, '../..', 'public', 'people');
      break;
    case "projects":
      destinationFolder = path.join(__dirname, '../..', 'public', 'projects');
      break;
    default:
      destinationFolder = path.join(__dirname, '../..', 'public', 'uploads');
  }

  fs.access(destinationFolder, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
    cb(null, destinationFolder);
  });

};




// Función para verificar si el archivo existe, si existe, añade un sufijo (ej: logo(1).png)
export const checkFileExists = (filePath) => {
  // Si el archivo no existe, lo devolvemos tal cual
  console.log("FiLEPATH: ", filePath);
  if (!fs.existsSync(filePath)) {
    console.log("checkFileExists, Path original: ", filePath);
    return filePath;
  }

  // Si el archivo existe, empezamos a añadir el sufijo
  const { dir, name, ext } = path.parse(filePath);  // Desglosamos el path
  let i = 1;
  let newFilePath = path.join(dir, `${name}(${i})${ext}`);  // Empezamos con el sufijo (1)

  // Incrementando el sufijo si el archivo ya existe
  while (fs.existsSync(newFilePath)) {
    i++;
    newFilePath = path.join(dir, `${name}(${i})${ext}`);
  }

  console.log("checkFileExists, Nuevo path: ", newFilePath); // Depuración para ver el nombre final
  return newFilePath;  // Devolvemos el nuevo path con sufijo si es necesario
};



// ------------------- Filtros de archivos -------------------//

// Filtro para solo imágenes
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes (jpg, png y gif)"), false);
  }
};

// Filtro para imágenes y otros tipos de archivos
const generalFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};


//----------------- Configuración de almacenamiento  -----------------

// Configuración de almacenamiento para landing
const getFolderLanding = (req, file, cb) => {
  getDestinationFolder("landing", file, cb);
};

// Configuración de almacenamiento para people
const getFolderPeople = (req, file, cb) => {
  getDestinationFolder("people", file, cb);
};

// Configuración de almacenamiento para projects
const getFolderProjects = (req, file, cb) => {
  getDestinationFolder("projects", file, cb);
};

// Configuración de almacenamiento para uploads
const getFolderUploads = (req, file, cb) => {
  getDestinationFolder("uploads", file, cb);
};


//----------------- Storages  -----------------

// Almacenamiento para la carpeta de imágenes de landing
const storageLanding = multer.diskStorage({
  destination: getFolderLanding,  // Usar la función para determinar la carpeta
  filename: (req, file, cb) => {
    // Llama a la función checkFileExists para obtener un nombre único
    const originalFilePath = path.join(__dirname, '../..', 'public', 'landing', file.originalname);
    const uniqueFilename = checkFileExists(originalFilePath); // Obtener el nombre único si ya existe

    cb(null, path.basename(uniqueFilename)); // Devuelve el nombre modificado
  },
});

const storagePeople = multer.diskStorage({
  destination: getFolderPeople,  // Usar la función para determinar la carpeta
  filename: (req, file, cb) => {
    // Llama a la función checkFileExists para obtener un nombre único
    const originalFilePath = path.join(__dirname, '../..', 'public', 'people', file.originalname);
    const uniqueFilename = checkFileExists(originalFilePath); // Obtener el nombre único si ya existe

    cb(null, path.basename(uniqueFilename)); // Devuelve el nombre modificado
  },
});


// Almacenamiento para la carpeta de proyectos
const storageProjects = multer.diskStorage({
  destination: getFolderProjects,  // Usar la función para determinar la carpeta
  filename: (req, file, cb) => {
    // Llama a la función checkFileExists para obtener un nombre único
    const originalFilePath = path.join(__dirname, '../..', 'public', 'projects', file.originalname);
    const uniqueFilename = checkFileExists(originalFilePath); // Obtener el nombre único si ya existe

    cb(null, path.basename(uniqueFilename)); // Devuelve el nombre modificado
  },
});

// Almacenamiento para la carpeta de uploads
const storageUploads = multer.diskStorage({
  destination: getFolderUploads,  // Usar la función para determinar la carpeta
  filename: (req, file, cb) => {
    // Llama a la función checkFileExists para obtener un nombre único
    const originalFilePath = path.join(__dirname, '../..', 'public', 'uploads', file.originalname);
    const uniqueFilename = checkFileExists(originalFilePath); // Obtener el nombre único si ya existe

    cb(null, path.basename(uniqueFilename)); // Devuelve el nombre modificado
  },
});


// ------------ Instancias para cargar archivos ------------

// Una sola imagen en la carpeta landing
export const uploadImagesLanding = multer({
  storage: storageLanding,
  limits: { fileSize: 10 * 1024 * 1024 }, // Tamaño máximo: 10MB
  fileFilter: imageFileFilter,
});

// Una sola imagen en la carpeta people
export const uploadImagesPeople = multer({
  storage: storagePeople,
  limits: { fileSize: 10 * 1024 * 1024 }, // Tamaño máximo: 10MB
  fileFilter: imageFileFilter,
});


// Varias imagenes en la carpeta projects
export const uploadImageProjects = multer({
  storage: storageProjects,
  limits: { fileSize: 10 * 1024 * 1024 }, // Tamaño máximo: 10MB
  fileFilter: imageFileFilter,
});

// Varios archivos e imagenes en la carpeta uploads
export const uploadFiles = multer({
  storage: storageUploads,
  limits: { fileSize: 10 * 1024 * 1024 }, // Tamaño máximo: 10MB
  fileFilter: generalFileFilter,
});




