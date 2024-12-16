import React, { useEffect, useRef, useState } from "react";
import tweetsData from "./XData";

const XCard = ({tweetUrl, tweetText, tweetDate}) => {
  const tweetRef = useRef(null);
   const [isClient, setIsClient] = useState(false);
    
  useEffect(() => {
    setIsClient(true);
    const scriptExists = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    
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

  if (!isClient) {
    return null; // Esto evita que el tweet se renderice durante la hidración
  }

  return (
    <div className="p-4 rounded-xl" style={{ backgroundColor: "#026e76" }}>
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Tweets from Temporal Twitter</h2>
      <div ref={tweetRef} className="space-y-4 overflow-y-auto max-h-screen border-t border-b border-gray-200 py-4">
        {tweetsData.map((tweet) => (
          <div key={tweet.id} className="mb-4 px-3 text-left">
            <blockquote
              className="twitter-tweet p-2 rounded-lg"
              style={{ backgroundColor: "#026e76" }}
              dangerouslySetInnerHTML={{ __html: tweet.content }}
            ></blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XCard;