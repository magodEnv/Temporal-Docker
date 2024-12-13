"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "../components/Card/ProjectCard";
import Loading from "./loading";

const apiUrl = process.env.NEXT_PUBLIC_API;

const Proyectos = () => {
  const [projects, setProjectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const url = `${apiUrl}/api/proyectos`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProjectos(data.data);

      /*    // Inicializar los índices de imágenes para cada proyecto
      const initialIndices = data.data.map(() => 0); // Inicializamos con 0 para cada proyecto
      setCurrentImageIndices(initialIndices); */
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  /*  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  } */

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-950">
      {/* Titulo de pagina */}
      <div className="flex flex-col w-full bg-background md:px-24 px-5 py-3 pb-10 rounded-t-3xl min-h-screen">
        <h1 className="text-white text-5xl font-extralight">
          Projects Gallery
        </h1>
        <div className="w-full h-1 border-b border-b-gray-500"></div>
        {/* Main */}
        <div className="flex flex-wrap gap-10 pt-10 justify-center items-center">
          {/* Tarjetas de Proyectos */}
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              mainImage={project.core_image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
