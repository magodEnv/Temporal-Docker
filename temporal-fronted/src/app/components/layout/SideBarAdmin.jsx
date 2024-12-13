"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { GrMenu } from "react-icons/gr";
import { FaFolder } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { MdArticle } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/navigation';

const sections = [
  { href: "/dashboard", label: "Main", icon: AiFillHome },
  { href: "/dashboard/People", label: "People", icon: BsPeopleFill },
  { href: "/dashboard/Projects", label: "Projects", icon: FaFolder },
  {
    href: "/dashboard/Publications",
    label: "Publications",
    icon: MdArticle,
  },
];

const logout = { href: "#", label: "Log out", icon: MdOutlineLogin };

const SideBarAdmin = () => {
  const [open, setOpen] = useState(false);
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirige a login si no hay usuario autenticado
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(true); // Abierto en pantallas grandes (lg)
      } else {
        setOpen(false); // Cerrado en pantallas pequeñas (sm, md)
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    console.log('logout');
    window.location.href = "/api/auth/logout";
    localStorage.removeItem('redirectedToDashboard');
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col h-full bg-gray-800 overflow-hidden transition-all duration-300 ${
          open ? "w-52" : "w-14"
        }`}
      >
        <div
          className="flex w-full p-4 gap-4 cursor-pointer bg-gray-900 hover:bg-primary"
          onClick={handleOpen}
        >
          <div className="flex-1">
            <GrMenu size={20} />
          </div>
          <div className="w-full">
            <span
              className={`${
                open ? "" : "hidden"
              } whitespace-nowrap  duration-300`}
            >
              DASHBOARD
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div>
            {sections.map((section, index) => (
              <Section section={section} open={open} key={index} />
            ))}
          </div>
          <div onClick={handleLogout}>
            <Section section={logout} open={open} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ section, open }) => {
  const pathname = usePathname();
  const Icon = section.icon;

  return (
    <div key={section.href}>
      <Link
        href={section.href}
        className={` flex items-center gap-4 py-4 px-4 w-full duration-200 ${
          pathname === section.href
            ? "bg-primary text-white"
            : "hover:bg-gray-400 hover:text-primary"
        }`}
      >
        <div className="flex-1">
          <Icon size={20} />
        </div>
        <div className="w-full">
          <span
            className={`${
              open ? "" : "hidden"
            } whitespace-nowrap  duration-300`}
          >
            {section.label}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SideBarAdmin;
