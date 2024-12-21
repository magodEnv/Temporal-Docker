"use client";

import { useEffect, useState } from "react";
import PublicationCard from "../components/Card/PublicationCard";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";

const apiUrl = process.env.NEXT_PUBLIC_API;

export default function Page() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState({
    processingFetch: false,
    scraping: false,
  });
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchData = async () => {
      setLoading((prev) => ({ ...prev, processingFetch: true }));
      try {
        const response = await fetch(`${apiUrl}/api/publicaciones`);
        if (!response.ok) throw new Error("Network response was not ok");
        const publicationsData = await response.json();
        const sortedPublications = publicationsData.data.sort(
          (a, b) => b.year_publi - a.year_publi
        );
        setPublications(sortedPublications || []);
        console.log("Existing publications");
        console.log(publicationsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading((prev) => ({ ...prev, processingFetch: false }));
      }
    };
    fetchData();
  }, []);

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    const sortedPublications = [...publications].sort((a, b) => {
      return newSortOrder === "desc"
        ? b.year_publi - a.year_publi
        : a.year_publi - b.year_publi;
    });
    setSortOrder(newSortOrder);
    setPublications(sortedPublications);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <div className="flex flex-col bg-background rounded-t-3xl w-full min-h-screen px-5 py-3 md:px-24">
        <div className="flex justify-between">
          <h1 className="text-white text-5xl font-extralight">Publications</h1>
          <div className="flex items-end ">
            <div
              className="flex justify-center items-center cursor-pointer hover:text-gray-300 duration-300 gap-2"
              onClick={toggleSortOrder}
            >
              <p>Sort</p>
              {sortOrder === "asc" ? (
                <FaSortAmountDown size={20} />
              ) : (
                <FaSortAmountUp size={20} />
              )}
            </div>
          </div>
        </div>

        {/* Indicador de carga */}
        {loading.processingFetch && (
          <p className="text-white text-center mt-5">Loading data...</p>
        )}

        {/* Contenido principal */}
        {!loading.processingFetch && publications.length > 0 && (
          <div className="py-5 md:px-10 space-y-2">
            {publications.map((publication, index) => (
              <PublicationCard
                key={index}
                url={publication.url}
                title={publication.title}
                year={publication.year_publi}
                authors={publication.authors}
              />
            ))}
          </div>
        )}

        {/* Mensaje si no hay publicaciones */}
        {!loading.processingFetch && publications.length === 0 && (
          <p className="text-gray-400 text-center mt-5">
            No publications found.
          </p>
        )}
      </div>
    </div>
  );
}
