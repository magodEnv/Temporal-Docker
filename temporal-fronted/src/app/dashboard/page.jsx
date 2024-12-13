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
const defaultImagePath = "/verde_inicio.jpg";

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

  const [originalImagene, setOriginalImagen] = useState("");
  const [imagenDefault, setImagenDefault] = useState(false);

  const [imagen, setImagen] = useState("");

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
    console.log("editingText:", editingText);
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

  const handleChange = async (fieldNames) => {
    let newEditingText = { ...editingText };
    console.log("defaultImage: ", imagenDefault); 
    if (fieldNames === "banner") {
      newEditingText.banner = bannerText;
    } else if (fieldNames === "welcome") {
      newEditingText.bienvenida = welcomeText;
      if(imagenDefault){//true
        newEditingText.imagen = defaultImagePath;
        deletePreviousImage();
        //setPreviewPhoto(null);
      } else {
        //console.log("Imagen sleeccionada: ", editingText.imagen);
        newEditingText.imagen = editingText.imagen;
      };

      console.log("IMAGEN:   ", newEditingText.imagen);
    } else if (fieldNames === "estado") {
      const newVisibility = !visibility;
      newEditingText.estadoBanner = newVisibility;
      setVisibility(newVisibility);
    } /*else if (fieldNames === "imagen") {
      //console.log("Cambiar imagen");
      document.getElementById("inputImagen").click();
    } else if (fieldNames === "imagenDefault") {
      console.log("imagen default");
      newEditingText.imagen = defaultImagePath;
      deletePreviousImage();
      setPreviewPhoto(null);
    }*/

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
      console.log("Data updated:", result);
      //setOriginalImagen(editingText.imagen);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Warning", "Please select only one image file.", "");
      event.target.value = "";
      return;
    }

    let baseName = file.name.replace(/ /g, "_");
    let filePath = `/Images/${baseName}`;
    let count = 1;

    // Verificación de existencia de archivo
    while (await fileExists(filePath)) {
      const nameParts = baseName.split(".");
      const extension = nameParts.pop();
      const newBaseName = `${nameParts.join(".")}(${count++}).${extension}`;
      filePath = `/Images/${newBaseName}`;
    }

    const imageUrl = URL.createObjectURL(file);
    setImagen(filePath); // Url de la imagen
    setPreviewPhoto(imageUrl); // URL blob de la imagen
    setEditingText({ ...editingText, imagen: filePath });

    event.target.value = "";

    handleSubmitImage(file);
    /*let newEditingText = { ...editingText };
    newEditingText.imagen = filePath;
    console.log("Imagen añadida: ", newEditingText.imagen);

    // Aquí pasa el archivo directamente, no solo la ruta
    handleSubmitImage(file);
    // Eliminar la imagen anterior antes de cambiarla
    await handleSubmit(newEditingText);*/
  };

  // Función para verificar si un archivo existe
  const fileExists = async (filePath) => {
    try {
      const response = await fetch(filePath, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const handleSubmitImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    console.log("Imagen a subir:", file.name);
    deletePreviousImage();

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("DATA:  ", data);
      setOriginalImagen("/Images/" + file.name);
      console.log("Imagen orige: ", originalImagene);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const deletePreviousImage = async () => {
    const imageNameToDelete = originalImagene.split("/").pop();
    const encodedImageName = encodeURIComponent(imageNameToDelete);
    console.log("Imagen a eliminar:", encodedImageName);
    try {
      const response = await fetch(`/api/upload?filename=${encodedImageName}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      //ALERTA DE ERROR
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
                onChange={handlePhotoChange} // Cuando seleccionen una imagen, manejarla
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
                    src={previwImage || editingText.imagen}
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
