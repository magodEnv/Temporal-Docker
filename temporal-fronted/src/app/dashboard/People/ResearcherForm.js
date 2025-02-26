import { Alert, AlertConfirm } from "@/app/components/Common/Alert";
import ContainerForm from "@/app/components/Forms/ContainerForm";
import InputBasic from "@/app/components/Forms/InputBasic";
import InputImage from "@/app/components/Forms/InputImage";
import InputSelection from "@/app/components/Forms/InputSelection";
import InputSubElementos from "@/app/components/Forms/InputSubElementos";
import InputTextArea from "@/app/components/Forms/InputTextArea";
import React, { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API;

const roles = [
  "Core Researcher",
  "Researcher Assistant",
  "Student",
  "Collaborator",
  "Alumni",
];

const ResearcherForm = ({
  researcher,
  onClose,
  onSubmit,
  isCreating,
  setAlertMessage,
  setShowAlert,
}) => {
  const defaultImagePath = `profile_default.jpeg`; // Ruta de la imagen por defecto
  const [formData, setFormData] = useState({
    id: researcher?.id || "",
    name: researcher?.name_ || "",
    grade: researcher?.grade || "",
    institute: researcher?.institute || "",
    correo: researcher?.correo || "",
    rol: researcher?.rol || "",
    core_page: researcher?.core_page || "",
    description: researcher?.description_ || "",
    photo: researcher?.photo || defaultImagePath, // Usar imagen por defecto
  });
  const [isPhotoDeleted, setIsPhotoDeleted] = useState(false); // Estado para marcar foto eliminada
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // Para manejo de alertas
  const [originalProject, setOriginalProject] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [current, setCurrent] = useState(null);

  const [previwImage, setPreviewPhoto] = useState(null);
  const [file, setFile] = useState(null);

  // Actualiza el estado cuando cambia el investigador
  useEffect(() => {
    if (researcher) {
      setFormData({
        id: researcher?.id || "",
        name: researcher?.name_ || "",
        grade: researcher?.grade || "",
        institute: researcher?.institute || "",
        correo: researcher?.correo || "",
        rol: researcher?.rol || "",
        core_page: researcher?.core_page || "",
        description: researcher?.description_ || "",
        photo: researcher?.photo || defaultImagePath,
      });
      setOriginalProject({
        id: researcher?.id || "",
        name: researcher?.name_ || "",
        grade: researcher?.grade || "",
        institute: researcher?.institute || "",
        correo: researcher?.correo || "",
        rol: researcher?.rol || "",
        core_page: researcher?.core_page || "",
        description: researcher?.description_ || "",
        photo: researcher?.photo || defaultImagePath,
      });
      setFile(null); // Restablecer el archivo de foto al editar
    }
  }, [researcher]);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const previewImage = URL.createObjectURL(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
    setPreviewPhoto(previewImage); // URL blob de la imagen
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
    formData.append('category', "people")

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

  // Función que maneja la eliminación de la foto
  const handleDeletePhoto = () => {
    setIsPhotoDeleted(true); // Marcar que la foto se eliminará

    setFormData((prev) => ({
      ...prev,
      originalPhoto: prev.photo, // Guardar la foto original que se eliminará
      photo: defaultImagePath, // Cambiar a la foto por defecto
    }));
    setFile(null);
  };

  // Función para enviar los datos del formulario a la BD
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      id: formData.id,
      name_: formData.name,
      grade: formData.grade,
      institute: formData.institute,
      correo: formData.correo,
      rol: formData.rol,
      core_page: formData.core_page,
      description_: formData.description,
      photo: isPhotoDeleted ? defaultImagePath : formData.photo, // Usar la foto por defecto si está marcada como eliminada
    };
    if (dataToSend.rol === "") {
      setMessage("Role is required");
      return;
    }


    if(file){
      const path = await handlePhotoChange(file);
      dataToSend.photo = path;

    }



    // Ahora verifica la eliminación
    if (isPhotoDeleted && originalProject.photo !== defaultImagePath) {
      /*
      const imageNameToDelete = formData.originalPhoto.split("/").pop();
      const encodedImageName = encodeURIComponent(imageNameToDelete);

      try {
        const response = await fetch(
          `/api/upload?filename=${encodedImageName}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar la imagen del servidor");
        }
        //console.log("Imagen eliminada con éxito");
      } catch (error) {
        //console.error("Error deleting file:", error);
      }*/
    }

    // Continúa con la lógica de guardar los datos del investigador
    //const method = dataToSend.id ? "PUT" : "POST"; // Si tiene id, es PUT, si no es POST

    const method = isCreating ? "POST" : "PUT";
    const url = dataToSend.id
      ? `${apiUrl}/api/personas/${dataToSend.id}` // Actualizar
      : `${apiUrl}/api/personas`; // Crear nuevo
    ////console.log("metodo: ", method); //metodo:
    ////console.log("datos a enviar: ", dataToSend); //datos a enviar:
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        if (originalProject && originalProject.photo !== defaultImagePath) {
          handleDeleteImagen(originalProject);
        }

        const updatedResponse = await fetch(`${apiUrl}/api/personas`);
        const updatedData = await updatedResponse.json();
        setFormData(updatedData.formData);
        setMessage("Researcher successfully saved");

        setShowAlert(true);
        onSubmit();
        onClose();
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Funcion que eliminar un investigador
  const handleDelete = async (personId) => {
    try {
      //Elimina la persona:
      const response = await fetch(`${apiUrl}/api/personas/${personId.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: personId }),
      });

      if (response.ok) {
        setMessage("Researcher successfully eliminated");
        setShowAlert(true);
        onSubmit();
        onClose();
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }

    //Elimina la imagen en el servidor:
    handleDeleteImagen(personId);
  };

  // Funcion que eliminar una imagen de un investigador
  const handleDeleteImagen = async (personId) => {
    
    if (personId.photo !== defaultImagePath) {
      console.log("imagen a eliminar: ", personId.photo);
      try {
        // Llamamos a la API para eliminar el archivo, pasando solo el nombre del archivo
        const response = await fetch(`${apiUrl}/api/multer/delete-file`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename: personId.photo, categoria: "people" }),
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


    }else{
      console.log("No se puede eliminar la imagen por defecto");
    }
  };

  // Función para verificar si hay cambios
  const hasChanges = () => {

    return JSON.stringify(formData) !== JSON.stringify(originalProject );
  };

  return (
    <ContainerForm
      title={isCreating ? "New Person" : "Edit person"}
      closeContainer={() => {
        if (!hasChanges()) onClose();
        setShowCancel(true);
      }}
      handleSubmit={handleFormSubmit}
      isCreating={isCreating}
      handleDelete={() => {
        setCurrent(researcher);
        setShowDelete(true);
      }}
      currentPerson
      hasChanges={hasChanges}
    >
      {message && <div className="mb-4 text-red-500">{message}</div>}
      {/* Campos del formulario */}
      <div className="flex gap-4 w-full">
        <div className="w-[40%]">
          <InputBasic
            title="Name *"
            name="name"
            valor={formData.name}
            handle={handleChange}
            isRequired={true}
          />
        </div>
        <div className="w-[30%]">
          <InputBasic
            title="Email"
            name="correo"
            valor={formData.correo}
            handle={handleChange}
          />
        </div>
        <div className="w-[30%]">
          <InputSelection
            title="Rol *"
            name="rol"
            valor={formData.rol}
            handle={handleChange}
            elementos={roles}
            isRequired={true}
          />
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <div className="w-[40%]">
          <InputBasic
            title="Institution"
            name="institute"
            valor={formData.institute}
            handle={handleChange}
          />
        </div>
        <div className="w-[30%]">
          <InputBasic
            title="Grade"
            name="grade"
            valor={formData.grade}
            handle={handleChange}
          />
        </div>
        <div className="w-[30%]">
          <InputBasic
            title="Core Page"
            name="core_page"
            valor={formData.core_page}
            handle={handleChange}
          />
        </div>
      </div>
      <InputTextArea
        title="Description"
        name="description"
        valor={formData.description}
        handle={handleChange}
      />
      {/* Photo Section */}
      <InputImage
        handleImageUpload={handleFileChange}
        handleImageDelete={handleDeletePhoto}
        imagePreviews={
          file ? previwImage : formData.photo
        }
        isResearcher={true}
      />{" "}
      <div>
        {showDelete && (
          <AlertConfirm
            title="Delete"
            message="Are you sure you want to delete this person?"
            cancel={() => setShowDelete(false)}
            confirm={() => {
              handleDelete(current);
              setShowDelete(false);
            }}
            action="Delete"
          />
        )}
        {showCancel && (
          <AlertConfirm
            title="Unsaved changes"
            message="Are you sure you want to close without saving changes?"
            cancel={() => setShowCancel(false)}
            confirm={() => {
              onClose();
              setShowCancel(false);
            }}
            action="Yes"
          />
        )}
      </div>
    </ContainerForm>
  );
};

export default ResearcherForm;
