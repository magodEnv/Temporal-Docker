import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

//images={project.imagenes[currentImageIndices[projectIndex]]?.url}

export default function ProjectCard({ project, mainImage }) {
  const [pathImage, setPathImage] = useState(mainImage);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    const mainImageIndex = project.imagenes.findIndex(
      (image) => image.url === mainImage
    );
    setPathImage(project.imagenes);
    setCurrentImageIndex(mainImageIndex !== -1 ? mainImageIndex : 0);
  };

  const handleMouseLeave = () => {
    setPathImage(mainImage);
    setCurrentImageIndex(0);
  };

  // Cambia las imágenes del proyecto cada 1.5 segundos
  useEffect(() => {
    let interval;
    if (Array.isArray(pathImage)) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pathImage.length);
      }, 1500); // 1.5 segundos
    }

    return () => clearInterval(interval);
  }, [pathImage]);

  const currentImageUrl = Array.isArray(pathImage)
    ? pathImage[currentImageIndex]?.url
    : pathImage;

  return (
    <div
      className="grid grid-cols-1 group h-[22rem] w-[25rem] rounded-xl bg-zinc-900 text-lg hover:border-0 hover:bg-primary shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/Projects/${project.id}`} className="h-full w-full">
        <div className="relative cursor-pointer overflow-hidden h-40 m-3 rounded-xl">
          <div className="absolute inset-0 rounded-lg">
            <Image
              src={currentImageUrl}
              fill={true}
              alt={`Project image ${project.title}`}
              className="object-contain z-10"
            />
          </div>
        </div>
        <h2 className="font-semibold text-2xl text-center px-3">
          {project.title}
        </h2>
        <div className="flex-1 py-3 px-5 w-full">
          <p className="line-clamp-3 font-light text-justify">
            {project.abstract}
          </p>
        </div>
      </Link>
    </div>
  );
}
