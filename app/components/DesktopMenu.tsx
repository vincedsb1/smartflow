import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCirclePlus,
  faInbox,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUser } from "../context/UserContext";

const DesktopMenu: React.FC = () => {
  const pathname = usePathname();
  const { firstname } = useUser();

  const iconStyle = (icon: string) =>
    `h-7 w-7 ${
      pathname === `/${icon}`
        ? "text-cyan-700 dark:text-cyan-500"
        : "text-neutral-500"
    } group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-all hover:scale-105`;

  return (
    <div
      id="desktopMenuMainContainer"
      className="fixed top-0 flex flex-col items-start bg-white shadow-lg h-full max-h-screen justify-between w-48 md:w-72 pl-5 md:pl-10 pb-10 "
    >
      <div id="logoContainer" className="flex flex-col items-start">
        <div
          id="logoImageContainer"
          className="flex items-center space-x-2 relative w-36 h-32"
        >
          <Image
            src="/logo-light.svg"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
        <nav id="navigationMenu" className="flex flex-col space-y-8 mt-8">
          <Link href="/today" className="flex items-center space-x-2 group">
            <div
              id="todayIcon"
              className="w-7 h-7 flex justify-center items-center"
            >
              <FontAwesomeIcon
                icon={faBookOpen}
                className={`${iconStyle("today")} text-xl`}
              />
            </div>
            <span className="font-text text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 ease-in-out pl-2">
              Réciter
            </span>
          </Link>
          <Link href="/add" className="flex items-center space-x-2 group">
            <div
              id="addIcon"
              className="w-7 h-7 flex justify-center items-center"
            >
              <FontAwesomeIcon
                icon={faCirclePlus}
                className={`${iconStyle("add")} text-xl`}
              />
            </div>
            <span className="font-text text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 ease-in-out pl-2">
              Ajouter une fiche
            </span>
          </Link>
          <Link href="/organize" className="flex items-center space-x-2 group">
            <div
              id="organizeIcon"
              className="w-7 h-7 flex justify-center items-center"
            >
              <FontAwesomeIcon
                icon={faInbox}
                className={`${iconStyle("organize")} text-xl`}
              />
            </div>
            <span className="font-text text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 ease-in-out pl-2">
              Organiser
            </span>
          </Link>
        </nav>
      </div>
      <div id="userMenu" className="flex flex-col items-start space-y-4">
        <div id="userActions" className="mt-auto">
          <div id="userDetails" className="flex flex-col space-y-5">
            <span className="font-text text-lg text-neutral-700 dark:text-neutral-300">
              Bonjour {firstname}
            </span>
            <Link href="/user" className="flex items-center space-x-2 group">
              <FontAwesomeIcon
                icon={faUser}
                className={`${iconStyle("user")} text-xl`}
              />
              <span className="font-text text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 ease-in-out pl-2">
                Paramètres
              </span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 group">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className={`${iconStyle("")} text-xl`}
              />
              <span className="font-text text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 ease-in-out pl-2">
                Déconnexion
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopMenu;
