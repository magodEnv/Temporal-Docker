"use client";
import TarjetaResponse from "../components/ui/TarjetaResponse";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CiImageOff } from "react-icons/ci";
import { MdImage } from "react-icons/md";
import { useState, useEffect } from "react";
import InputBasic from "@/app/components/Forms/InputBasic";
import ProjectsDynamic from "../components/ui/ProjectsDynamic";
import { Alert } from "../components/Common/Alert";



const apiUrl = process.env.NEXT_PUBLIC_API;
const defaultImagePath = `verde_inicio.jpg`;

export default function Page() {
  // Aca se debe corregir cuando se conecte al backend
  // Ahora el estado inicial es FALSE
  // Cuando se carge el backend debe PREGUNTAR el estado
  const [visibility, setVisibility] = useState(true);

  const [projects, setProjectos] = useState([]);
  const [mainProjects, setMainProjects] = useState([]);

  const [dataBannerWelcome, setDataBannerWelcome] = useState([]); //Data original de la base de datos
  const [bannerText, setBannerText] = useState(""); //Estado del textarea del banner
  const [welcomeText, setwelcomeText] = useState(""); //Estado del textarea del welcome
  const [editingText, setEditingText] = useState([]); //Estado
  const [previwImage, setPreviewPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const [originalImagene, setOriginalImagen] = useState("");
  const [imagenDefault, setImagenDefault] = useState(false);


  const [loading, setLoading] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(["", ""]);


  useEffect(() => {
    // Si la imagen está configurada como la imagen predeterminada, mostrarla
    if (imagenDefault) {
      setPreviewPhoto(defaultImagePath);  // Mostramos la imagen predeterminada en la previsualización
      setImagenDefault(true);
     
    }
    console.log("Imagen default: ", defaultImagePath);
  }, [imagenDefault]);
  
  useEffect(() => {
    fetchLandingInfo();
    fetchProjects();
    fetchMainProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const url = `${apiUrl}/api/proyectos`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data.data);
      setProjectos(data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMainProjects = async () => {
    try {
      setLoading(true);
      const url = `${apiUrl}/api/mainProyectos`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //console.log("Main:", data.data);
      setMainProjects(data.data);
    } catch (error) {
      console.error("Error fetching main projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLandingInfo = async () => {
    try {
      setLoading(true);
      const url = `${apiUrl}/api/landingInfo`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data.data);
      setBannerText(data.data[0].banner);
      setwelcomeText(data.data[0].bienvenida);
      setDataBannerWelcome(data.data[0]);
      setEditingText(data.data[0]);
      //setOriginalImagen(data.data[0].imagen);

      // setProjectos(data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };
  



  /*useEffect(() => {
    console.log("dataBannerWelcome: ", dataBannerWelcome);
  } , [dataBannerWelcome]); */
  useEffect(() => {
    //console.log("editingText:", editingText);
  }, [editingText]);

  /* 
  useEffect(() => {
    console.log("originalImagene:", originalImagene);
  }, [originalImagene]);
  
  useEffect(() => {
    console.log("bannerText: ", bannerText);
  } , [bannerText]);

  useEffect(() => {
    console.log("welcomeText: ", welcomeText);
  } , [welcomeText]);*/

  const handleBanner = async (e) => {
    setBannerText(e.target.value);
  };

  const handleWelcome = async (e) => {
    setwelcomeText(e.target.value);
  };


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const previewImage = URL.createObjectURL(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
    setPreviewPhoto(previewImage); // URL blob de la imagen
  };

  // Función para manejar los cambios en los campos de texto
  const handleChange = async (fieldNames) => {
    let newEditingText = { ...editingText };
    //console.log("defaultImage: ", imagenDefault); 
    if (fieldNames === "banner") {
      newEditingText.banner = bannerText;
    } else if (fieldNames === "welcome") {
      newEditingText.bienvenida = welcomeText;
      if(imagenDefault){//true
        await deletePreviousImage(newEditingText.imagen);
        newEditingText.imagen = defaultImagePath;
        
        //setPreviewPhoto(null);
      } else {
        //console.log("Imagen sleeccionada: ", editingText.imagen);
        const path = await handlePhotoChange(file);
        newEditingText.imagen = path;
        //console.log("Imagen seleccionada: ", path);
        //console.log("newEditingText.imagen: ", newEditingText.imagen);
      };

      //console.log("IMAGEN:   ", newEditingText.imagen);
    } else if (fieldNames === "estado") {
      const newVisibility = !visibility;
      newEditingText.estadoBanner = newVisibility;
      setVisibility(newVisibility);
    } 

    // Enviar directamente los cambios al backend sin esperar a que React actualice el estado
    await handleSubmit(newEditingText);
  };

  const handleChangeImage = async (fieldNames) => {
    let newEditingText = { ...editingText };
    if (fieldNames === "imagen") {
      //console.log("Cambiar imagen");
      document.getElementById("inputImagen").click();
      setImagenDefault(false);
    } else if (fieldNames === "imagenDefault") {
      console.log("imagen default");
      //newEditingText.imagen = defaultImagePath;
      setImagenDefault(true);
      /*
      deletePreviousImage();
      setPreviewPhoto(null);*/
    }
  }

  // Función para enviar los cambios al backend
  const handleSubmit = async (data) => {
    try {
      const url = `${apiUrl}/api/landingInfo`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      //console.log("Data updated:", result);
      //setOriginalImagen(editingText.imagen);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para manejar el cambio de la imagen
  const handlePhotoChange = async (filepath) => {
    const file = filepath;

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Warning", "Please select only one image file.", "");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', "landing")

    //const previewImage = URL.createObjectURL(file);
    const path = "";
    
    try{
      const response = await fetch(`${apiUrl}/api/multer/${formData.get("category")}`, {
          method: 'POST',
          body: formData,
      });
      if (!response.ok) {
          throw new Error("Hubo un error al cargar el archivo.");
        }
      const path = await handleVerificarArchivo(formData);
      const cleanPath = path.replace(/^(\.\.\/)/, '');
      const parts = cleanPath.split("/");
      const name = parts.slice(1).join("/");
      console.log("¡Archivo cargado exitosamente!, path:", path);
      return name;
      setFoto(null);
      } catch {
          console.log("Error al subir la foto");
      } 

  };

    //Funcion que verifica si el archivo fue subido correctamente
  const handleVerificarArchivo = async (formData) => {
    const file = formData.get('image');

    try{
        const response = await fetch(`${apiUrl}/api/multer/file-exists`, {
            method: "POST",
            body: JSON.stringify({ file: file.name, category: formData.get("category") }),
            headers: {
              'Content-Type': 'application/json',  // Asegúrate de enviar los encabezados correctos
            },
        });
        if(!response.ok){
            throw new Error("Error al verificar el archivo");
        }
        const data = await response.json();
        //console.log("data:", data);
        return data.newFilePath;
    } catch (error) {
        console.log("Error al verificar el archivo");
        return null;
    }
  };


  // Función para eliminar la imagen anterior (api upload)
  const deletePreviousImage = async (path) => {
    // Extraemos solo el nombre del archivo (sin la ruta completa)
    const imageNameToDelete = path.split("/").pop();
    
    console.log("Imagen a eliminar:", imageNameToDelete); // Solo el nombre del archivo
    
    try {
      // Llamamos a la API para eliminar el archivo, pasando solo el nombre del archivo
      const response = await fetch(`${apiUrl}/api/multer/delete-file`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: imageNameToDelete, categoria: "landing" }),
      });
  
      // Verificamos si la respuesta es correcta
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Si la eliminación fue exitosa
      console.log("Imagen eliminada con éxito.");
    } catch (error) {
      // Si hubo un error al intentar eliminar la imagen
      console.error("Error deleting file:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-white text-center font-bold text-4xl py-10">
        Admin Dashboard
      </h1>

      <div className="flex flex-col justify-center items-center w-full px-5 md:px-10">
        {/* Banner */}
        <TarjetaResponse title="Banner">
          <div className="pb-4 flex flex-col">
            <div className="">
              <InputBasic
                title="Text Banner"
                name="banner"
                valor={bannerText}
                handle={handleBanner}
              />
            </div>
            <div className="flex justify-end pt-4 items-center gap-3">
              <div
                className="bg-primary flex justify-center items-center rounded-lg h-12 w-20 cursor-pointer"
                onClick={() => handleChange("estado")} // boton de visibilidad
              >
                {visibility ? (
                  <MdVisibility size={30} />
                ) : (
                  <MdVisibilityOff size={30} />
                )}
              </div>
              <div
                className="bg-sky-600 flex justify-center items-center rounded-lg h-12 w-24 cursor-pointer text-lg"
                onClick={() => {
                  handleChange("banner");
                  setMessage(["", "Saved Changes"]);
                  setShowAlert(true);
                }} // Save del banner
              >
                Save
              </div>
            </div>
          </div>
        </TarjetaResponse>
        <TarjetaResponse title="Text welcome">
          <div className="pb-4 flex flex-col">
            <div className="">
              <InputBasic
                title="Text Welcome"
                name="bienvenida"
                valor={welcomeText}
                handle={handleWelcome}
              />
            </div>
            <div className="flex justify-end pt-4 items-center gap-3">
              <input
                type="file"
                id="inputImagen"
                style={{ display: "none" }} // Ocultamos el input de tipo file
                accept="image/*"
                onChange={handleFileChange} // Cuando seleccionen una imagen, manejarla
              />
              <div
                className="bg-primary flex justify-center items-center rounded-lg h-12 w-20 cursor-pointer"
                onClick={() => handleChangeImage("imagen")} // boton de visibilidad
              >
                <MdImage size={30} color="#D3D3D3" />
              </div>
              <div
                className="bg-red-500 flex justify-center items-center rounded-lg h-12 w-20 cursor-pointer"
                onClick={() => handleChangeImage("imagenDefault")} // boton de visibilidad
              >
                <CiImageOff size={30} color="#D3D3D3" />
              </div>
              <div
                className="bg-sky-600 flex justify-center items-center rounded-lg h-12 w-24 cursor-pointer text-lg"
                onClick={() => {
                  handleChange("welcome");
                  setMessage(["", "Saved Changes"]);
                  setShowAlert(true);
                }} //save del welcome
              >
                Save
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 p-3">
              {(previwImage || editingText.imagen) && (
                <div className="relative mt-4 w-[90%] h-52 bg-zinc-950 p-4 rounded-lg">
                  <img
                    src={previwImage || `${apiUrl}/public/landing/${editingText.imagen}`}
                    alt="Imagen seleccionada"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-xl p-4">
                    <div className="w-full max-w-full h-full flex justify-center items-center text-white text-base text-center overflow-hidden">
                      {welcomeText} {/* El texto se superpone aquí */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TarjetaResponse>

        <TarjetaResponse title="Landing Projects">
          {projects && (
            <ProjectsDynamic data={projects} valor={mainProjects.reverse()} />
          )}
        </TarjetaResponse>
      </div>
      {showAlert && (
        <Alert
          title={message[0]}
          message={message[1]}
          isOpen={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
