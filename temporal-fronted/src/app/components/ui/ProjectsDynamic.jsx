"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SelectMainProjects from "../Forms/SelectMainProjects";
const apiUrl = process.env.NEXT_PUBLIC_API;

const ProjectCard = ({ project }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-neutral-800 rounded-lg p-4 m-2"
    >
      <h1>{project.title}</h1>
    </div>
  );
};

const ProjectsDynamic = ({ data, valor }) => {
  const [projects, setProjects] = useState(data); // Todos los proyectos
  const [mainProjects, setMainProjects] = useState(valor); // Proyectos principales
  const [selectedProjects, setSelectedProjects] = useState([]);

  const [dataBD, setdataBD] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainProjectsBD = await fetch(`${apiUrl}/api/mainProyectos`);
        if (!mainProjectsBD.ok) {
          throw new Error("Error en la petición");
        }
        const mainProjectsData = await mainProjectsBD.json();
        setdataBD(mainProjectsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSave = async () => {
    const url = `${apiUrl}/api/mainProyectos`;
    // POST a la API de mainProjects
    console.log("Guardado de proyectos");
    console.log(mainProjects);

    //Primero eliminamos todos los proyectos principales
    try {
      const response = await fetch(`${apiUrl}/api/mainProyectos/${1}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Captura el error del servidor
        console.error("Error details: ", errorData);
        setAlertMessage([
          "Error",
          `Error deleting all projects: ${errorData.message || "Undefined"}`,
        ]);
        setShowAlert(true);
        return;
      }

      const data = await response.json();
      //console.log(data.message); // Mensaje de éxito: "Todos los proyectos han sido eliminados y el contador de IDs ha sido restablecido."
    } catch (error) {
      console.error("Error in request: ", error);
      setAlertMessage([
        "Error",
        `There was a problem with the request: ${error.message}`,
      ]);
      setShowAlert(true);
    }

    //Luego guardamos los proyectos principales

    for (let i = 0; i < mainProjects.length; i++) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ proyecto_id: mainProjects[i].id }),
        });
        if (!response.ok) {
          const errorData = await response.json(); // Captura el error del servidor
          console.error("Error details: ", errorData);
          setAlertMessage([
            "Error",
            `Error saving project: ${errorData.message || "Undefined"}`,
          ]);
          setShowAlert(true);
          return;
        }
      } catch (error) {
        console.error("Error in request: ", error);
        setAlertMessage([
          "Error",
          `There was a problem with the request: ${error.message}`,
        ]);
        setShowAlert(true);
      }
    }
  };

  useEffect(() => {
    setMainProjects(() => {
      return selectedProjects.map((id) =>
        projects.find((project) => project.id === id)
      );
    });
  }, [selectedProjects]);

  useEffect(() => {
    console.log("dataBD: ", dataBD);
    console.log("selectedProjects", selectedProjects);
    //setMainProjects(dataBD.data.map((project) => project.proyecto_id));
    //setMainProjects(dataBD.data);
    console.log("mainProjects", mainProjects);
    if (dataBD && mainProjects) {
      setSelectedProjects(() => {
        // Ordenar dataBD según `id` de manera ascendente
        const sortedDataBD = dataBD.sort((a, b) => a.id - b.id);

        // Extraer los `proyecto_id` en orden ascendente
        const c = sortedDataBD.map((item) => item.proyecto_id);
        return c;
      });
    }
  }, [dataBD]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMainProjects((projects) => {
        const oldIndex = projects.findIndex(
          (project) => project.id === active.id
        );
        const newIndex = projects.findIndex(
          (project) => project.id === over.id
        );

        return arrayMove(projects, oldIndex, newIndex);
      });
    }
  };

  const handleChange = (updatedProjects) => {
    setSelectedProjects(updatedProjects);
  };

  console.log("Main", mainProjects);

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-light pb-2">Main Projects</h1>
      <div className="bg-zinc-700 p-3 rounded-lg mb-3">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={mainProjects}
            strategy={verticalListSortingStrategy}
            className="flex flex-col gap-3"
          >
            {mainProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <SelectMainProjects
        title="Projects Avaible"
        name="Select projects avaibles"
        valor={selectedProjects} // Sincronizado con el estado principal
        handle={handleChange}
        elementos={projects}
      />
      <div className="flex justify-end pb-4">
        <div
          className="bg-sky-600 flex justify-center items-center rounded-lg h-12 w-24 cursor-pointer text-lg"
          onClick={onSave}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default ProjectsDynamic;
