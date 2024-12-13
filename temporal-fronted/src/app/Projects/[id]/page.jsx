"use client";
import React, { useEffect, useState } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API;

const Page = ({ params }) => {
  const [project, setProjectos] = useState(null);
  const [colaboradores, setColaboradores] = useState(null);
  const [coreResearcher, setCoreResearcher] = useState(null);
  const id = React.use(params)?.id;

  useEffect(() => {
    if (id) {
      fetchProjects();
    }
  }, [id]);

  const fetchProjects = async () => {
    try {
      const url = `${apiUrl}/api/proyectos`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const proyecto = buscarPorId(data.data, id);
      setProjectos(proyecto);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching researchers:", error);
    }
  };

  function buscarPorId(jsonData, idBuscado) {
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].id == idBuscado) {
        buscarPeople(jsonData[i].investigadores, false);
        buscarPeople(jsonData[i].coreResearchers, true);
        return jsonData[i];
      }
    }
    return null;
  }

  function buscarPeople(investigadores, isCore) {
    let i = [];

    investigadores.map((investigador) => {
      i.push(investigador.persona.name_);
    });

    if (isCore) setColaboradores(i);
    else setCoreResearcher(i);
  }

  if (!project) {
    return (
      <div
        style={{
          color: "black",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Loading projects...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center bg-slate-400">
        <img
          src={"/Images/fondecyt3160182.png"}
          className="w-auto h-52 object-contain"
        />
      </div>
      <div className="flex flex-col justify-center w-full px-4 py-3 md:px-24">
        <h1 className="text-start text-4xl font-light">{project.title}</h1>
        <h2 className="text-start text-lg font-light italic">
          {project.subtitle}
        </h2>
        <div className="w-full h-1 border-b border-b-gray-500"></div>
        <div className="p-3">
          <h2 className="font-bold text-2xl">Abstract</h2>
          <p className="font-light text-justify p-3">{project.abstract}</p>
          <h2 className="font-bold text-2xl">Description</h2>
          <p className="font-light text-justify p-3">{project.description_}</p>
          <h2 className="font-bold text-2xl">People</h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="font-bold text-xl pl-3 pt-3">Core researhcers</h3>
              <WrapPeople people={colaboradores} />
            </div>
            <div>
              <h3 className="font-bold text-xl pl-3 pt-3">Collaborators</h3>
              <WrapPeople people={coreResearcher} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrapPeople = ({ people }) => {
  return (
    <ul className="list-disc space-y-2 pt-2 pl-10">
      {people.map((person, index) => (
        <li key={index}>{person}</li>
      ))}
    </ul>
  );
};

export default Page;
