"use client";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import ResearcherCard from "./components/Card/ResearcherCard";
import XCard from "./components/Card/XCard";
import XCardNegro from "./components/Card/XCardNegro";
import StudentCard from "./components/Card/StudentCard";
import AlumniCard from "./components/Card/AlumniCard";
import ProjectsHome from "./components/Card/HomeMainCard";
import ResearcherContainer from "./components/Card/ResearcherContainer";
import Banner from "./components/Card/Banner";
const apiUrl = process.env.NEXT_PUBLIC_API;

export default function Page() {
  const [json, setData] = useState({
    "Core Researcher": [],
    "Researcher Assistant": [],
    Student: [],
    Collaborator: [],
    Alumni: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [landingData, setlandingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landingInfo = await fetch(`${apiUrl}/api/landingInfo`);
        if (!landingInfo.ok) {
          throw new Error("Network response was not ok");
        }
        const landingInfoData = await landingInfo.json();
        setlandingData(landingInfoData.data[0]); // Asignar la primera entrada del array
      } catch (error) {
        console.error("Error fetching landing info:", error);
      }
    };
    fetchData();

  }, []);
  useEffect(() => {
    fetchResearchers();
  }, []);

  const fetchResearchers = async () => {
    try {
      setLoading(true);
      const url = `${apiUrl}/api/personas`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data.data);
      groupByRole(data.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching researchers:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupByRole = (people) => {
    const grouped = {
      "Core Researcher": [],
      "Researcher Assistant": [],
      Student: [],
      Collaborator: [],
      Alumni: [],
    };

    people.forEach((person) => {
      if (grouped[person.rol]) {
        grouped[person.rol].push(person);
      }
    });

    //console.log(grouped);

    setData(grouped);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center bg-zinc-950">
      {landingData && landingData.estadoBanner && (
        <Banner
          text={
            landingData ? (
              <p className="text-center">{landingData.banner}</p>
            ) : (
              <p>Cargando...</p>
            )
          }
        />
      )}

      {error && <p>Error loading data: {error}</p>}
      {/* Tarjetas de proyectos */}
      <div className="pt-2 pb-8 bg-zinc-950">
        <ProjectsHome />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full px-14 gap-x-6 bg-background rounded-t-3xl">
        {/* Contenedor de Investigadores Core */}
        <div className="flex flex-col justify-center items-center w-full py-5 space-y-3">
          <div className="w-full">
            <ResearcherContainer
              title="Core Researchers"
              json={json["Core Researcher"]}
            />
          </div>
          <div className="w-full">
            <ResearcherContainer
              title="Assistant Researchers"
              json={json["Researcher Assistant"]}
            />
          </div>
        </div>

		{/* X embed */}
		<div className="flex p-5 items-center justify-center">
			{/*{xposts.map((id) => (
				<Tweet key={id} id={id} />
			))}*/}
			<XCardNegro />
		</div>
		{/*<div className="flex p-5 items-center justify-center">
          <XCard />
        </div>*/}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 bg-zinc-600 w-full">
        {/* Seccion de estudiantes */}
        <div className="text-white flex flex-col items-start w-full p-5">
          <div className="">
            <h1 className="text-3xl ">Students</h1>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start pl-5 p-3">
            {json.Student.length > 0 ? (
              json.Student.map((student) => (
                <div key={student.id}>
                  <StudentCard
                    name={student.name_}
                    institute={student.institute}
                    imagePath={student.photo}
                    page={student.core_page}
                  />
                </div>
              ))
            ) : (
              <p>No students found.</p>
            )}
          </div>
        </div>

        {/* Seccion de colaboradores */}

        <div className="text-white flex flex-col items-start bg-primary w-full p-5">
          <div className="">
            <h1 className="text-3xl ">Collaborators</h1>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start pl-5 p-3">
            {json.Collaborator.length > 0 ? (
              json.Collaborator.map((collaborator) => (
                <div key={collaborator.id}>
                  <StudentCard
                    name={collaborator.name_}
                    institute={collaborator.institute}
                    imagePath={collaborator.photo}
                    page={collaborator.core_page}
                  />
                </div>
              ))
            ) : (
              <p>No collaborators found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Seccion de alumni */}

      <div className="flex flex-col text-white justify-center w-full p-5 bg-background">
        <div className="">
          <h1 className="text-2xl ">Alumni</h1>
        </div>
        <div className="flex pl-6 pt-4 flex-col justify-center items-start">
          {json.Alumni.length > 0 ? (
            json.Alumni.map((alumni) => (
              <div key={alumni.id}>
                <AlumniCard
                  name={alumni.name_}
                  description={alumni.description_}
                />
              </div>
            ))
          ) : (
            <p>No alumni found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
