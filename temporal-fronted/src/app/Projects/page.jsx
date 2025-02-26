"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "../components/Card/ProjectCard";
import { Card, Skeleton } from "@nextui-org/react";

const apiUrl = process.env.NEXT_PUBLIC_API;

const Proyectos = () => {
  const [projects, setProjectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
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
      console.log("Projects data:", data.data);

      /*    // Inicializar los índices de imágenes para cada proyecto
      const initialIndices = data.data.map(() => 0); // Inicializamos con 0 para cada proyecto
      setCurrentImageIndices(initialIndices); */
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-950">
      <div className="flex flex-col w-full bg-background md:px-24 px-5 py-3 pb-10 rounded-t-3xl min-h-screen">
        <h1 className="text-white text-5xl font-extralight">
          Projects Gallery
        </h1>
        <div className="w-full h-1 border-b border-b-gray-500"></div>
        {/* Main */}

        <div className="flex flex-wrap gap-10 pt-10 justify-center items-center">
          {loading ? (
            // Mostrar Skeleton mientras se cargan los datos
            <CardSkeleton />
          ) : (
            <>
              {/* Tarjetas de Proyectos */}
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  mainImage={project.core_image}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CardSkeleton = () => {
  const skeletonArray = Array.from({ length: 5 }, (_, i) => i);
  return (
    <>
      {skeletonArray.map((i) => (
        <div key={i}>
          <Card
            className="h-[22rem] w-[25rem] space-y-5 p-4 bg-zinc-900"
            radius="lg"
          >
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-background" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-background" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-background" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-background" />
              </Skeleton>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default Proyectos;
