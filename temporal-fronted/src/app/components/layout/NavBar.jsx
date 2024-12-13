"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/logo/logo-horiz.png";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <header className="bg-zinc-950">
      {!pathname.startsWith("/dashboard") && (
        <div className="container mx-auto flex justify-between items-center py-5 px-6">
          <div>
            <Link href="/">
              <Image
                src={Logo}
                alt="Bienvenida Nosotros"
                width={180}
                height={70}
              />
            </Link>
          </div>
          <nav className="flex space-x-6 text-text text-sm md:text-xl font-light">
            <Link
              href="/Projects"
              className={`hover:text-primary flex justify-center items-center ${
                pathname === "/Projects"
                  ? "bg-primary py-2 px-3 shadow-sm rounded-md hover:text-gray-300"
                  : ""
              }`}
            >
              Projects
            </Link>
            <Link
              href="/Publications"
              className={`hover:text-primary flex justify-center items-center ${
                pathname === "/Publications"
                  ? "bg-primary py-2 px-3 shadow-sm rounded-md hover:text-gray-300"
                  : ""
              }`}
            >
              Publications
            </Link>
            <Link
              target="_blank"
              href="https://github.com/temporal-hpc/"
              className="flex justify-center items-center bg-primary space-x-2 px-4 h-10 rounded-md text-black hover:text-text"
            >
              <p className="font-light">GitHub</p>
              <FaGithub />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
