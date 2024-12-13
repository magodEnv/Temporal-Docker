import Image from "next/image";
import Link from "next/link";

const StudentCard = ({ name, imagePath, institute, page }) => {
  return (
    <Link
      href={page !== "" || page.toLowerCase() !== "temporal.cl" ? page : "#"}
      target={
        page !== "" || page.toLowerCase() !== "temporal.cl" ? "_blank" : "_self"
      }
      className="h-14 w-60 flex items-center justify-start m-3 bg-zinc-900 overflow-visible relative rounded-lg"
    >
      <div className="h-16 w-16 relative -left-3">
        <Image
          src={imagePath}
          alt={name}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col justify-start">
        <h1 className="text-base">{name}</h1>
        <p className="text-xs text-gray-500">{institute}</p>
      </div>
    </Link>
  );
};

export default StudentCard;
