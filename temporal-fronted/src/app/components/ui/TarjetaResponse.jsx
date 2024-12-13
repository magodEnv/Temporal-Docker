"use client";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const TarjetaResponse = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="py-5 w-full">
      <div
        className="flex bg-neutral-800 shadow-md rounded-t-md px-3 md:px-8 py-4 place-content-between cursor-pointer hover:bg-zinc-700 duration-200"
        onClick={toggleOpen}
      >
        <h1>{title} </h1>
        <IoIosArrowDown size={25} />
      </div>
      {isOpen && (
        <div className="bg-neutral-800 shadow-md border-t border-t-black rounded-b-md px-3 md:px-8 py-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default TarjetaResponse;
