import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Search from "../Common/Search";

const SelectMainProjects = ({ title, name, valor = [], handle, elementos }) => {
  // Ordenar elementos alfabéticamente
  const sortedElements = [...elementos].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const [filteredData, setFilteredData] = useState(sortedElements);

  const updateFilteredData = (searchTerm) => {
    const results = sortedElements.filter(
      (item) => item.name_.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra según el nombre
    );
    setFilteredData(results);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    handle((prevSelected) => {
      const updated = checked
        ? [...prevSelected, parseInt(value)] // Agregar ID si está marcado
        : prevSelected.filter((id) => id !== parseInt(value)); // Quitar ID si está desmarcado
      return updated;
    });
  };

  // Función para obtener los nombres de los investigadores seleccionados
  const getSelectedNames = () => {
    return elementos
      .filter((elemento) => valor.includes(elemento.id)) // Filtramos los elementos que coinciden con los IDs seleccionados
      .map((elemento) => elemento.title); // Extraemos los nombres de los investigadores
  };

  return (
    <div className="relative mb-3">
      <label className="block mb-1 text-lg font-light">{title}</label>
      <div className="mt-1 bg-neutral-900 flex min-h-8 w-full p-2  rounded-sm focus:ring-0 focus:outline-none justify-between items-center ">
        {valor.length ? getSelectedNames().join(", ") : name}
      </div>
      <div className="flex flex-wrap gap-3 z-10 mt-1 bg-neutral-900 rounded-sm shadow-lg">
        <div className="w-full p-2 pb-0">
          <Search update={updateFilteredData} />
        </div>
        {filteredData.map((elemento) => (
          <label
            key={elemento.id}
            className="flex flex-1 basis-[calc(50%-1rem)] p-2 cursor-pointer items-center"
          >
            <input
              type="checkbox"
              value={elemento.id}
              checked={valor.some((id) => id === elemento.id)} // Verificar si el ID está seleccionado
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            {elemento.title} {/* Aquí mostramos el nombre del investigador */}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelectMainProjects;
