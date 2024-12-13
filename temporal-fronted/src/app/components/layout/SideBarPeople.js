"use client";
import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const roles = [
  "All",
  "Core Researcher",
  "Researcher Assistant",
  "Student",
  "Collaborator",
  "Alumni",
];

const Menu = ({ onSelect, selectedRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="w-full">
      {/* Boton para agregar ocultar menu en pantallas pequeñas */}
      <div className="sm:hidden flex justify-center p-2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex justify-between p-2 rounded-md transition duration-200 bg-slate-400 text-gray-800 font-semibold w-full`}
        >
          {selectedRole}
          <IoMdMenu />
        </button>
      </div>

      {/* Menu de roles */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:flex sm:flex-col md:flex md:flex-row w-full justify-start p-2 sm:p-0 sm:pl-4 items-center`}
      >
        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => onSelect(role)}
              className={`text-center p-2 rounded-lg sm:rounded-t-md sm:rounded-b-none text-white transition duration-200 min-w-16 ${
                selectedRole === role
                  ? "bg-background2 text-white font-semibold"
                  : "bg-gray-600 text-gray-800 sm:border-b-2 sm:border-b-gray-800 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
