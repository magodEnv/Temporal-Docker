import Image from "next/image";
import Link from "next/link";

const ResearcherCard = ({ name, institute, imagePath, page }) => {
  return (
    <Link
      href={page !== "" || page.toLowerCase() !== "temporal.cl" ? page : "#"}
      target={
        page !== "" || page.toLowerCase() !== "temporal.cl" ? "_blank" : "_self"
      }
      className="h-72 w-48 flex flex-shrink-0 flex-col items-center mx-auto"
    >
      <div className="flex relative rounded-full h-1/2 w-3/4 mt-10">
        <Image
          src={imagePath}
          fill
          alt={name}
          className="object-cover rounded-full"
        />
      </div>
      <div className="w-full mt-4 grid grid-cols-1 justify-center">
        <h1 className="text-center">{name}</h1>
        <p className="text-stone-400 text-sm text-center">{institute}</p>
      </div>
    </Link>
  );
};

export default ResearcherCard;
