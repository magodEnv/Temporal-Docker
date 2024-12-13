import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";

const InputSelection = ({
  title,
  name,
  valor,
  handle,
  elementos,
  isRequired = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-3">
      <label htmlFor={name.toLowerCase()} className="font-light text-lg">
        {title}
      </label>
      <div className="relative">
        <select
          id={name.toLowerCase()}
          name={name.toLowerCase()}
          value={valor}
          onChange={handle}
          required={isRequired}
          className="mt-1 bg-slate-700 flex min-h-8 w-full p-2 focus:border-b-2 rounded-sm focus:border-green-500 focus:ring-0 focus:outline-none cursor-pointer hover:bg-slate-600 duration-200 appearance-none pr-10" // pr-10 para espacio del ícono
        >
          <option value="" disabled>
            {`Select a ${title}`}
          </option>
          {elementos.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <IoIosArrowDown
          size={25}
          className={`${
            isOpen ? "rotate-180 duration-300" : "duration-300"
          } absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-white`}
        />
      </div>
    </div>
  );
};

export default InputSelection;
