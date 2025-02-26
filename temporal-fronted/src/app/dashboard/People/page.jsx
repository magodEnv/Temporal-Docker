"use client";
import React, { useEffect, useState } from "react";
import ResearcherForm from "./ResearcherForm";
import Menu from "../../components/layout/SideBarPeople";
import Loading from "@/app/Projects/loading";
import ButtonAdd from "@/app/components/Common/ButtonAdd";
import PhotoCard from "@/app/components/Card/ProjectCard";
import { Alert, AlertConfirm } from "@/app/components/Common/Alert";
import TablaPeople from "@/app/components/table/TablaPeople";
const apiUrl = process.env.NEXT_PUBLIC_API;
const defaultImagePath = "/Images/profile_default.jpeg";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedResearcher, setSelectedResearcher] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Core Researcher");

  // Alertas
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(["", ""]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);

  const fetchResearchers = async () => {
    try {
      //setLoading(true);
      const response = await fetch(`${apiUrl}/api/personas`);
      if (!response.ok) {
        throw new Error("Error fetching investigadores");
      }
      const result = await response.json();
      setData(result.data || []); // Si no hay "data", se usa un arreglo vacío
      ////console.log("personas: " + JSON.stringify(result.data));
    } catch (error) {
      ////console.error("Error fetching investigadores:", error);
      setError("Error loading researchers");
    }
  };

  useEffect(() => {
    fetchResearchers();
  }, []);

  const handlePhotoClick = (researcher) => {
    setSelectedResearcher(researcher);
    setAlertMessage(["", "Changes saved successfully"]);
    setIsCreating(false);
  };

  const handleFormClose = () => {
    setSelectedResearcher(null);
    setIsCreating(false);
    fetchResearchers(); // Refrescar la lista al cerrar el formulario
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setAlertMessage(["", "New person saved successfully"]);
    setSelectedResearcher(null);
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    if (role === "All") {
      //console.log("All");
    }
    fetchResearchers(); // Opcional: refrescar la lista al cambiar de rol
  };

  const handleDelete = async (personId) => {
    try {
      const response = await fetch(`${apiUrl}/api/personas/${personId.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: personId }),
      });

      if (response.ok) {
        //console.log("Researcher successfully eliminated: ", personId.name_);
        setAlertMessage(
          "",
          "Researcher " + personId.name_ + " successfully eliminated"
        );
        onSubmit();
        onClose();
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      setAlertMessage("Error: ", `${error.message}`);
    }

    //Elimina la imagen en el servidor:
    handleDeleteImagen(personId);

    fetchResearchers(); // Opcional: refrescar la lista al cambiar de rol
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

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }

  // Filtrar investigadores por rol seleccionado
  const researchersToShow =
    selectedRole === "All"
      ? data
      : data.filter((researcher) => researcher.rol === selectedRole);

  return (
    <div className="flex min-h-screen min-w-full">
      <ButtonAdd handle={handleCreateNew} />
      {/*Contenedor de pagina*/}
      <div className="flex-1 w-full items-center justify-center">
        {/* Header interno de la pagina */}
        <div className="flex flex-col bg-gray-800 relative min-h-32">
          <div className="flex justify-center w-full items-center mb-3 mt-2">
            <h1 className="text-white text-2xl p-5">Temporal People</h1>
          </div>
          <div className="flex w-full justify-center items-center">
            <Menu onSelect={handleSelectRole} selectedRole={selectedRole} />
          </div>
        </div>

        {/* Tabla de People */}
        <div className="px-4 py-5">
          {researchersToShow.length > 0 && (
            <TablaPeople
              peoples={researchersToShow}
              handleEditClick={handlePhotoClick}
              handleDelete={handleDelete}
              currentPerson={setCurrentPerson}
            />
          )}
        </div>
      </div>

      {(selectedResearcher || isCreating) && (
        <ResearcherForm
          researcher={selectedResearcher}
          onClose={handleFormClose}
          onSubmit={fetchResearchers} // Este es el paso clave
          isCreating={isCreating}
          setAlertMessage={setAlertMessage}
          setShowAlert={setShowAlert}
        />
      )}
      {/* Mostrar alerta si showAlert es true */}
      <div>
        {showAlert && (
          <Alert
            title={alertMessage[0]}
            message={alertMessage[1]}
            isOpen={() => setShowAlert(false)}
          />
        )}
      </div>
      <div>
        {showConfirm && (
          <AlertConfirm
            title="Delete"
            message="Are you sure you want to delete this person?"
            cancel={() => setShowConfirm(false)}
            confirm={() => {
              handleDelete(currentPerson);
              setShowConfirm(false);
            }}
            action="Delete"
          />
        )}
      </div>
    </div>
  );
}
