import { IoIosArrowForward } from "react-icons/io";
import ResearcherCard from "./ResearcherCard";
import { useRef, useState, useEffect } from "react";

const ResearcherContainer = ({ title, json }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, [json]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-white text-3xl font-bold">{title}</h1>
          </div>
          <div className="flex">
            <IoIosArrowForward
              className={`rotate-180 ${
                !canScrollLeft && "opacity-50 cursor-not-allowed"
              }`}
              size={25}
              onClick={canScrollLeft ? scrollLeft : null}
            />
            <IoIosArrowForward
              className={`${
                !canScrollRight && "opacity-50 cursor-not-allowed"
              }`}
              size={25}
              onClick={canScrollRight ? scrollRight : null}
            />
          </div>
        </div>
        <div className="w-full h-1 border-b border-b-gray-500"></div>
      </div>
      <div
        className="flex justify-start md:justify-center w-full overflow-x-auto"
        ref={scrollContainerRef}
      >
        <div className="flex space-x-4 justify-start">
          {json.length > 0 ? (
            json.map((researcher) => (
              <ResearcherCard
                key={researcher.id}
                name={researcher.name_}
                institute={researcher.institute}
                imagePath={researcher.photo}
                page={researcher.core_page}
              />
            ))
          ) : (
            <p>No researchers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearcherContainer;
