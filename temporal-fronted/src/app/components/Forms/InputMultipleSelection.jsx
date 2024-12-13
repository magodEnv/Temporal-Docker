import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Search from "../Common/Search";

const InputMultipleSelection = ({
  title,
  name,
  valor = [],
  notShow = [],
  update,
  handle,
  elementos,
  isRequired = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(""); // Estado para manejar el mensaje de error
  const dropdownRef = useRef(null);

  // Función para filtrar los elementos que no están en notShow
  const cleanElementos = (elements, exclude) => {
    return elements.filter((element) => !exclude.includes(element.id));
  };

  // Ordenar elementos alfabéticamente por el campo `name_`
  const sortedElements = cleanElementos([...elementos], notShow).sort((a, b) =>
    a.name_.localeCompare(b.name_)
  );

  //const [filteredData, setFilteredData] = useState(sortedElements);
  const [filteredData, setFilteredData] = useState(sortedElements);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateFilteredData = (searchTerm) => {
    const results = sortedElements.filter(
      (item) => item.name_.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra según el nombre
    );
    setFilteredData(results);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    handle((prevSelected) => {
      let updatedSelected;
      if (checked) {
        updatedSelected = [...prevSelected, parseInt(value)]; // Asegúrate de que los valores sean números enteros
      } else {
        updatedSelected = prevSelected.filter((id) => id !== parseInt(value)); // Elimina el ID si está desmarcado
      }

      if (isRequired && updatedSelected.length === 0) {
        setError("At least one selection is required.");
      } else {
        setError("");
      }

      console.log("selectedObjects: ", updatedSelected);
      update(updatedSelected);

      return updatedSelected;
    });
  };

  /* const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    handle((prevSelected) => {
      let updatedSelected;
      if (checked) {
        updatedSelected = [...prevSelected, parseInt(value)];
      } else {
        updatedSelected = prevSelected.filter((id) => id !== parseInt(value)); // Elimina el ID si está desmarcado
      }

      // Validar si al menos un checkbox está seleccionado
      if (isRequired && updatedSelected.length === 0) {
        setError("At least one selection is required.");
      } else {
        setError("");
      }

      // Llama a la función update con los objetos seleccionados
      const selectedObjects = elementos.filter((elemento) =>
        updatedSelected.includes(elemento.id)
      );
      update(selectedObjects);
      return updatedSelected;
    });
  }; */

  // Función para obtener los nombres de los investigadores seleccionados
  const getSelectedNames = () => {
    return elementos
      .filter((investigador) => valor.includes(investigador.id)) // Filtramos los elementos que coinciden con los IDs seleccionados
      .map((investigador) => investigador.name_); // Extraemos los nombres de los investigadores
  };

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative mb-3" ref={dropdownRef}>
      <label className="block mb-1">{title}</label>
      <div
        onClick={toggleDropdown}
        className="mt-1 bg-slate-700 flex min-h-8 w-full p-2 focus:border-b-2 rounded-sm focus:border-green-500 focus:ring-0 focus:outline-none cursor-pointer justify-between items-center hover:bg-slate-600 duration-200"
      >
        {valor.length ? getSelectedNames().join(", ") : name}
        <IoIosArrowDown
          size={25}
          className={`${isOpen ? "rotate-180 duration-300" : "duration-300"}`}
        />
      </div>
      {isOpen && (
        <div className="flex flex-wrap gap-3 z-10 mt-1 bg-slate-700 rounded-sm shadow-lg">
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
                checked={valor.includes(elemento.id)} // Comprobamos si el ID está en los seleccionados
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {elemento.name_} {/* Aquí mostramos el nombre del investigador */}
            </label>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputMultipleSelection;
