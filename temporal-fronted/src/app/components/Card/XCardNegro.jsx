import React, { useEffect, useRef, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { Tweet } from "react-tweet";

const apiUrl = process.env.NEXT_PUBLIC_API;

const XCard = ({ tweetUrl, tweetText, tweetDate }) => {
  const tweetRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [xposts, setXposts] = useState([]); // Id's de posts de Twitter
  
  useEffect(() => {
    setIsClient(true);
    const scriptExists = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );

    // Verificar que el script de widgets no esté duplicado
    if (!scriptExists) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    } else {
      // Recargar los widgets si el script ya existe
      window.twttr?.widgets?.load(tweetRef.current);
    }
  }, []); 

  useEffect(() => {
    const fetchX = async () => {
      try {
        const response = await fetch("/api/X", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        //console.log("daaaaataaa: ", data);
        setXposts(data)
      } catch (error) {
        console.error("There was an error!", error);
      }
      

    }
    fetchX();

  }, []);
  useEffect(() => {
    console.log("xposts:", xposts);
  }, [xposts]);


  if (!isClient) {
    return null; // Esto evita que el tweet se renderice durante la hidración
  }

  return (
    <div className="p-4 rounded-xl" style={{ backgroundColor: "#1c1b22" }}>
      <h2 className="text-2xl font-bold mb-4 text-center text-white flex items-center justify-center">
        <FaXTwitter />
        <span className="ml-2">of Temporal</span>
      </h2>
      <div
        ref={tweetRef}
        className="space-y-4 overflow-y-auto max-h-screen border-t border-b border-gray-500 py-4"
      >
        {xposts.map((id) => (
          <Tweet key={id} id={id} />
        ))}
      </div>
    </div>
  );
  
};

export default XCard;
