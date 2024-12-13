import Link from "next/link";
import Image from "next/image";
import logoUach from "@/../public/logo/logo-uach.png";
import logoTemporal from "@/../public/logo/logo-vert.png";
import { FaGithub } from "react-icons/fa";

const NavBar = () => {
  return (
    <footer className="bg-black w-full grid grid-cols-1 md:grid-cols-3 place-content p-5">
      <div className="flex justify-center h-32">
        <Image
          src={logoTemporal}
          alt="Photo description"
          className="object-contain"
        />
      </div>

      <div className="flex justify-center items-center py-10 md:py-0 gap-2">
        <h2 className="text-lg">Visit our </h2>
        <Link
          className="flex space-x-1 items-center justify-center hover:text-green-500"
          target="_blank"
          href="https://github.com/temporal-hpc/"
        >
          <FaGithub size={25} />
          <p>GitHub </p>
        </Link>
      </div>

      <div className="flex justify-center h-32">
        <Image
          src={logoUach}
          alt="Photo description"
          className="object-contain"
        />
      </div>
    </footer>
  );
};

export default NavBar;
