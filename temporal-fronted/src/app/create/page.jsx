"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Sign In";
  }, []);
  
  const handleClick = () => {
    //console.log("Link clicked");
  };
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/bgpicture.jpg")' }}
    >
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-black text-2xl font-semibold mb-6">Sign In</h1>
        <form className="w-full">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escribe tu nombre"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escribe tu contraseña"
            />
          </div>
          <Link
            href="/dashboard"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 text-center"
          >
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}
