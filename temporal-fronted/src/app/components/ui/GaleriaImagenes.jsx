"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const GaleriaImagenes = ({ params }) => {
  const path = params?.path;
  const images = Array.isArray(path) ? path.flat() : [path]; // Normaliza la imagen
  const [imagenActiva, setImagenActiva] = useState(images[0]);

  useEffect(() => {
    if (!imagenActiva && images.length > 0) {
      setImagenActiva(images[0]);
    }
  }, [images, imagenActiva]);

  console.log("images", images);

  return (
    <div className="w-full h-[20rem] bg-black flex flex-col items-center justify-between relative">
      <div className="flex flex-1 w-full h-[16rem] items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={imagenActiva.url}
            alt="Imagen del proyecto"
            className="object-contain"
            fill
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className="bg-zinc-600 h-[4rem] w-full flex items-center justify-center gap-3">
          {images.map((img, index) => (
            <TarjetaImagen
              key={index}
              src={img.url}
              activa={imagenActiva.url === img.url}
              onClick={() => setImagenActiva(img)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TarjetaImagen = ({ src, activa, onClick }) => {
  return (
    <div
      className={`bg-black ${activa ? "" : "filter opacity-40"} cursor-pointer`}
      onClick={onClick}
    >
      <img src={src} width={50} height={60}></img>
    </div>
  );
};

export default GaleriaImagenes;
