"use client";
import Help from "@/app/components/Common/Help";
import { useEffect, useState } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API;
import { MdOutlineHelpOutline } from "react-icons/md";

export default function Page() {
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState("");
  const [urls, setUrls] = useState([]);
  const [existingPublications, setExistingPublications] = useState([]);
  const [scrapedPublications, setScrapedPublications] = useState([]);
  const [loading, setLoading] = useState({
    fetchingExisting: false,
    scraping: false,
  });
  const [scrapeStatus, setScrapeStatus] = useState({
    isActive: false,
    progress: 0,
  });
  const [helpVisible, setHelpVisible] = useState(false);

  const toogleHelp = () => {
    setHelpVisible(!helpVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading((prev) => ({ ...prev, fetchingExisting: true }));
      try {
        const publicacionesResponse = await fetch(
          `${apiUrl}/api/publicaciones`
        );
        if (!publicacionesResponse.ok)
          throw new Error("Network response was not ok");
        const publicationsData = await publicacionesResponse.json();
        setExistingPublications(publicationsData.data || []);
        console.log("Existing publications");
        console.log(publicationsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading((prev) => ({ ...prev, fetchingExisting: false }));
      }
    };
    fetchData();
  }, []);

  const isGoogleScholarUrl = (url) => {
    const regex = /^https:\/\/scholar\.google\.[a-z.]+\/citations\?user=/;
    return regex.test(url);
  };

  const addUrl = (e) => {
    e.preventDefault();
    if (!isGoogleScholarUrl(url)) {
      alert("Please enter a valid Google Scholar URL.");
      return;
    }
    if (url && interval) {
      setUrls([...urls, { url, interval }]);
      setUrl("");
      setInterval("");
    }
  };

  const removeUrl = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const postResearchers = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, scraping: true }));
    setScrapeStatus({ isActive: true, progress: 0 });
    setScrapedPublications([]);

    try {
      const response = await fetch(`${apiUrl}/api/publicaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Raw scrape data:", data);

      let publications = [];
      if (data && data.data) publications = data.data;
      else if (data && Array.isArray(data)) publications = data;
      else if (data && data.publications) publications = data.publications;

      console.log("Parsed publications:", data);

      setScrapeStatus({ isActive: false, progress: 100 });
      setScrapedPublications(data.savedPublications);
      setUrls([]);
    } catch (error) {
      console.error("Error starting scraping jobs:", error);
      alert("Error during scraping: " + error.message);
      setScrapeStatus({ isActive: false, progress: 0 });
    } finally {
      setLoading((prev) => ({ ...prev, scraping: false }));
    }
  };

  const deletePublication = async (id, type) => {
    console.log("Publication id:", id);

    try {
      const response = await fetch(`${apiUrl}/api/publicaciones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Eliminar de existingPublications si es de publicaciones existentes
        if (type === "existing") {
          setExistingPublications((prev) =>
            prev.filter((pub) => pub.id !== id)
          );
        }
        // Eliminar de scrapedPublications si es de publicaciones scrapeadas
        else if (type === "scraped") {
          setScrapedPublications((prev) => prev.filter((pub) => pub.id !== id));
        }

        console.log(response.message);
      }
    } catch (error) {
      console.error("Error deleting publication:", error);
      alert("Error al eliminar el proyecto: " + error.message);
    }
  };

  const deleteAllPublications = async () => {
    const isConfirmed = window.confirm(
      "¿Está seguro que quiere eliminar todas las publicaciones?"
    );

    if (!isConfirmed) return;

    try {
      // Combine both existing and scraped publications IDs
      const allPublicationIds = [
        ...existingPublications.map((pub) => pub.id),
        ...scrapedPublications.map((pub) => pub.id),
      ];

      // Delete each publication
      await Promise.all(
        allPublicationIds.map((id) =>
          fetch(`${apiUrl}/api/publicaciones/${id}`, { method: "DELETE" })
        )
      );

      // Clear both publication lists
      setExistingPublications([]);
      setScrapedPublications([]);
    } catch (error) {
      console.error("Error deleting all publications:", error);
      alert("Error al eliminar todos los proyectos: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-8">
      {/* Title */}
      <div className="flex justify-center items-center">
        <h1 className="text-3xl text-white text-center py-9">
          Scrapping Publications
        </h1>
      </div>

      {/* URL and Interval Input Form */}
      <div className="md:mx-56 flex">
        <div className="flex justify-start items-center bg-primary rounded-t-lg pt-1 pl-4 pr-1 space-x-2">
          <p>Scraping</p>
          <div
            className="cursor-pointer h-full w-6 flex justify-center items-center"
            onClick={toogleHelp}
          >
            <MdOutlineHelpOutline size={17} className="hover:text-yellow-700" />
          </div>
        </div>
      </div>
      <div className="bg-primary p-8 md:mx-56 rounded-b rounded-tr shadow-md text-neutral-900">
        <form onSubmit={addUrl} className="flex flex-col mb-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Google Scholar URL"
            className="block min-h-8 w-full p-2 shadow-sm rounded-sm focus:ring-0 focus:outline-none bg-grisForm focus:bg-gray-400"
          />
          <input
            type="text"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            placeholder="* * * * *"
            className="my-3 block min-h-8 w-full p-2 shadow-sm rounded-sm focus:ring-0 focus:outline-none bg-grisForm focus:bg-gray-400"
          />
          <button
            type="submit"
            className="mt-3 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 text-center"
          >
            Add URL
          </button>
        </form>
      </div>

      {/* URL List and Scraping Status */}
      <div className="w-full bg-gray-800 px-8 rounded my-8 py-3">
        <h2 className="text-xl font-semibold mb-4">URLs to Scrape:</h2>
        <ul>
          {urls.map((urlObj, index) => (
            <li
              key={index}
              className="mb-2 p-2 bg-primary rounded-lg flex justify-between"
            >
              <span>
                {urlObj.url} - Interval: {urlObj.interval}
              </span>
              <button onClick={() => removeUrl(index)} className="text-red-400">
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Scraping Progress Indicator */}
        {scrapeStatus.isActive && (
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${scrapeStatus.progress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-2">
              Scraping in progress... {scrapeStatus.progress}%
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={postResearchers}
            disabled={loading.scraping || urls.length === 0}
            className={`${
              loading.scraping || urls.length === 0
                ? "bg-gray-500"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-green-300 mt-4`}
          >
            {loading.scraping ? "Scraping..." : "Start Scraping"}
          </button>
        </div>
      </div>

      {/* Display Publications */}
      <div className="bg-gray-800 px-8 rounded mb-8 py-3">
        {/* Delete All Button */}
        {(scrapedPublications.length > 0 ||
          existingPublications.length > 0) && (
          <div className="flex justify-end mb-4">
            <button
              onClick={deleteAllPublications}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete All Publications
            </button>
          </div>
        )}

        {/* Scraped Publications Section */}
        <h2 className="text-xl font-semibold mb-4">
          New Scraped Publications:
        </h2>
        {loading.scraping ? (
          <div className="flex flex-col items-center space-y-4 py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-400">Scraping publications...</p>
          </div>
        ) : scrapedPublications && scrapedPublications.length > 0 ? (
          <div className="space-y-4 mb-8">
            {scrapedPublications.map((pub, index) => (
              <div
                key={`scraped-${index}`}
                className=" bg-primary rounded-lg hover:bg-gray-700 transition-colors border-l-8 border-green-500"
              >
                <div className="border-l-8 border-green-500 mb-2 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-lg font-semibold block mb-2"
                      >
                        {pub.title}
                      </a>
                      <p className="text-gray-300">Authors: {pub.authors}</p>
                      <p className="text-gray-400">Year: {pub.year_publi}</p>
                    </div>
                    <button
                      onClick={() => deletePublication(pub.id, "scraped")}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-8">No new scraped publications.</p>
        )}

        {/* Existing Publications Section */}
        <h2 className="text-xl font-semibold mb-4">Existing Publications:</h2>
        {loading.fetchingExisting ? (
          <div className="flex flex-col items-center space-y-4 py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-400">Loading publications...</p>
          </div>
        ) : existingPublications && existingPublications.length > 0 ? (
          <div className="space-y-4">
            {existingPublications.map((pub, index) => (
              <div
                key={`existing-${index}`}
                className="mb-2 p-4 bg-primary rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-lg font-semibold block mb-2"
                    >
                      {pub.title}
                    </a>
                    <p className="text-gray-300">Authors: {pub.authors}</p>
                    <p className="text-gray-400">Year: {pub.year_publi}</p>
                  </div>
                  <button
                    onClick={() => deletePublication(pub.id, "existing")}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No existing publications.</p>
        )}
      </div>
      {helpVisible && <Help close={toogleHelp} />}
    </div>
  );
}
