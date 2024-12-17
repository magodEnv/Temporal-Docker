"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API;

const HomeMainCard = () => {
  const scrollRef = useRef(null);
  const [dataBD, setdataBD] = useState([]); //PROYECTOS seleccionados
  const [landingData, setlandingData] = useState(null); //
  const [infoProyectos, setInfoProyectos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landingInfo = await fetch(`${apiUrl}/api/landingInfo`);
        const mainProjectsBD = await fetch(`${apiUrl}/api/mainProyectos`);
        const proyectos = await fetch(`${apiUrl}/api/proyectos`);

        if (!landingInfo.ok || !mainProjectsBD.ok || !proyectos.ok) {
          throw new Error("Network response was not ok");
        }

        const landingInfoData = await landingInfo.json();
        const mainProjectsData = await mainProjectsBD.json();
        const proyectosData = await proyectos.json(); //data global de la tabla proyectos
        const dataProyectosSeleccionados = [];
        // Depuración: Verifica el contenido de proyectosData
        //console.log("proyectosData:", proyectosData);

        // Verifica si proyectosData tiene la estructura correcta
        if (proyectosData && Array.isArray(proyectosData.data)) {
          // Crear un mapa de proyectosData para búsquedas rápidas
          const proyectosMap = new Map(
            proyectosData.data.map((p) => [p.id, p])
          ); // Aquí usamos `id` en lugar de `proyecto_id`

          for (let i = 0; i < mainProjectsData.data.length; i++) {
            const proyectoId = mainProjectsData.data[i].proyecto_id; // Usamos `proyecto_id` aquí
            const proyecto = proyectosMap.get(proyectoId);

            if (proyecto) {
              //console.log("Proyecto encontrado: ", proyecto.title);
              dataProyectosSeleccionados.unshift({
                id: proyecto.id, // ID del proyecto
                title: proyecto.title, // Título del proyecto
                imagen: proyecto.core_image, // Imagen del proyecto
              });
            } else {
              console.log("No se encontró proyecto con ID: ", proyectoId);
            }
          }

          // Descomentar las líneas cuando estés listo para renderizar
          // setdataBD(mainProjectsData);
          // setlandingData(landingInfoData.data[0]);
          //console.log("mainProjectsData: ", mainProjectsData.data);
          //console.log("proyectosData: ", proyectosData.data);
          //console.log("dataProyectosSeleccionados: ", dataProyectosSeleccionados);

          generainfoProyectos(
            landingInfoData.data[0],
            dataProyectosSeleccionados
          );
        } else {
          console.error(
            "proyectosData no tiene la estructura esperada. Estructura:",
            proyectosData
          );
        }
      } catch (error) {
        console.error("Error fetching landing info:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  
   useEffect(() => {
    //console.log("infoProyectos: ", infoProyectos);
  }, [infoProyectos]);/*
useEffect(() => {
    console.log("landingData titulo ", landingData );
  }, [landingData]);*/

  const generainfoProyectos = (welcome, project) => {
    //console.log("titulo bienvenida: ", welcome.bienvenida, " imagen: ", welcome.imagen);
    //console.log("largo infoProyectos: ", infoProyectos.length);

    setInfoProyectos([
      {
        title: welcome.bienvenida,
        imagen: welcome.imagen,
      },
    ]);

    setInfoProyectos((prev) => [...prev, ...project]);
    //console.log("Set infoProyectos: ", infoProyectos);
    //console.log("Proyectos: ", project);
    /*
        setInfoProyectos(prev => [
      ...prev,
      {
        title: welcome.bienvenida,
        image: welcome.imagen,
      }
    ]);
    for (let i = 0; i < project.length; i++) {
      console.log("largo infoProyectos1: ", infoProyectos.length);
      console.log("titulo project: ", project[i].title, " imagen: ", project[i].imagen);
      console.log("largo project: ", project.length);
    }*/
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth; // Tamaño de la tarjeta visible
      const maxScrollLeft =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      if (direction === "right") {
        if (scrollRef.current.scrollLeft + scrollAmount >= maxScrollLeft) {
          scrollRef.current.scrollBy({
            left: maxScrollLeft - scrollRef.current.scrollLeft,
            behavior: "smooth",
          });
          setTimeout(() => {
            scrollRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }, 4000); // Espera 4 segundos antes de volver al inicio
        } else {
          scrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollRef.current.scrollLeft <= 0) {
          scrollRef.current.scrollTo({
            left: maxScrollLeft,
            behavior: "smooth",
          });
        } else {
          scrollRef.current.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <div className="flex h-[30rem] w-screen justify-center items-center overflow-hidden">
      {/* Botón para desplazar hacia la izquierda */}
      <button
        className="absolute left-0 h-[30rem] w-16 bg-gradient-to-r from-black opacity-50 z-20"
        onClick={() => handleScroll("left")}
      ></button>

      <div
        ref={scrollRef}
        className="px-32 h-full w-full flex overflow-x-scroll scroll-smooth snap-x snap-mandatory hide-scrollbar z-10 space-x-5"
      >
        {infoProyectos.map((project, index) => (
          index === 0 ? (
            // Componente diferente para la primera tarjeta
            <TarjetaBienvenida
              key={index}
              title={project.title}
              imagen={project.imagen}
            />
          ) : (
            // El componente TarjetaProject para los demás proyectos
            <TarjetaProject
              key={index}
              title={project.title}
              imagen={project.imagen}
            />
          )
        ))}
      </div>

      {/* Botón para desplazar hacia la derecha */}
      <button
        className="absolute right-0 h-[30rem] w-16 bg-gradient-to-l from-black opacity-50 z-20"
        onClick={() => handleScroll("right")}
      ></button>
    </div>
  );
};

const TarjetaProject = ({ title, imagen }) => {
  return (
    <div className="h-full w-[90vw] flex-shrink-0 snap-center flex justify-center items-center">
      <div className="h-full w-full bg-gray-300 rounded-lg flex justify-center items-center relative overflow-hidden">
        <Image
          src={imagen}
          layout="fill"
          className="object-cover transition-transform duration-900 group-hover:scale-110 z-10"
          alt="Categoría"
        />
        <div className="absolute bottom-0 w-full p-10 z-20 bg-black bg-opacity-70">
          <p className="text-3xl text-white">{title}</p>
        </div>
      </div>
    </div>
  );
};

const TarjetaBienvenida = ({ title, imagen }) => {
  return (
    <div className="h-full w-[90vw] flex-shrink-0 snap-center flex justify-center items-center">
      <div className="h-full w-full bg-red-900 rounded-lg flex justify-center items-center relative overflow-hidden">
        <Image
          src={imagen}
          layout="fill"
          className="object-cover transition-transform duration-900 group-hover:scale-110 z-10"
          alt="Categoría"
        />
        <div className="p-10 z-20">
          {/* Asegurarse de que landingData no sea null antes de renderizar */}
          <p className="text-3xl text-center">{title}</p>
        </div>
      </div>
    </div>
  );
};


export default HomeMainCard;
