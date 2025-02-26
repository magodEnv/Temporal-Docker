"use client";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import BubbleImage from "./BubbleImage";
import { useState } from "react";
import { AlertConfirm } from "../Common/Alert";
import { TiArrowSortedUp } from "react-icons/ti";
const apiUrl = process.env.NEXT_PUBLIC_API;

const titles = [
  ["Image", ""],
  ["Title", "title"],
  ["Code", "code_project"],
  ["Start Date", "start_date"],
  ["State", "state_"],
];

const TablaProjects = ({
  projects,
  imagenes,
  handleEditClick,
  handleDeleteProyecto,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentProyect, setCurrentProyect] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (key) => {
    if (key !== "") {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc"; // Cambia a descendente si ya estaba en ascendente
      }
      setSortConfig({ key, direction });
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (!sortConfig.key) return 0; // No ordenar si no hay columna seleccionada
    const aValue = a[sortConfig.key]
      ? a[sortConfig.key].toString().toLowerCase()
      : "";
    const bValue = b[sortConfig.key]
      ? b[sortConfig.key].toString().toLowerCase()
      : "";

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="w-full">
      <table className="min-w-full shadow-2xl">
        <thead>
          <tr className="bg-black uppercase text-sm leading-normal">
            {titles.map((title, index) => (
              <th
                key={index}
                onClick={() => handleSort(title[1])}
                className={`py-3 px-5 text-left border-x-2 border-x-background cursor-pointer ${
                  index === 0 ? "w-20" : "" // Asigna ancho solo a la primera columna
                } `}
              >
                <div className="flex justify-between">
                  {title[0]}
                  {title[1] != "" && sortConfig.key === title[1] && (
                    <span>
                      {sortConfig.direction === "asc" ? (
                        <TiArrowSortedUp
                          className="rotate-180 duration-200"
                          size={20}
                        />
                      ) : (
                        <TiArrowSortedUp size={20} className="duration-200" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th className="py-3 px-5 text-left border-x-2 border-x-background">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            sortedProjects.map((project, index) => {
              // Filtrar la imagen correspondiente al proyecto
              const imagenDelProyecto = imagenes.find(
                (imagen) => imagen.proyecto_id === project.id
              );
              const imagenSrc = imagenDelProyecto
                ? project.core_image
                : "profile_default.jpeg";

              return (
                <tr
                  key={index}
                  className="font-light items-center odd:bg-tablaIntercalado1 even:bg-tablaIntercalado2 h-16"
                >
                  <td className="py-3 px-6 text-left text-xs border-r-2 border-background">
                    <BubbleImage image={`${apiUrl}/public/projects/${imagenSrc}`} />
                  </td>
                  <td className="py-3 px-6 text-left border-r-2 border-background">
                    {project.title}
                  </td>
                  <td className="py-3 px-6 text-left border-r-2 border-background">
                    {project.code_project}
                  </td>
                  <td className="py-3 px-6 text-left border-r-2 border-background">
                    {project.start_date}
                  </td>
                  <td className="py-3 px-6 text-left border-r-2 border-background">
                    {project.state_}
                  </td>
                  <td className="w-20">
                    <div className="flex justify-center items-center h-full space-x-3">
                      <FiEdit
                        onClick={() => handleEditClick(project)}
                        size={20}
                        className="hover:text-primary duration-150"
                      />
                      <FaTrash
                        onClick={() => {
                          setCurrentProyect(project.id);
                          setIsOpen(true);
                        }}
                        size={20}
                        className="hover:text-primary duration-150"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {isOpen && (
        <AlertConfirm
          title="Delete Proyect"
          message="Are you sure you want to delete this project?"
          cancel={() => setIsOpen(false)}
          confirm={() => {
            handleDeleteProyecto(currentProyect);
            setIsOpen(false);
          }}
          action="Delete"
        />
      )}
    </div>
  );
};

export default TablaProjects;
