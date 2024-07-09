import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCirclePlus,
  faInbox,
  faUser,
  faSignOutAlt,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUser } from "../context/UserContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useStep } from "../context/StepContext";

const DesktopMenu: React.FC = () => {
  const pathname = usePathname();
  const { firstname, setUser, setToken } = useUser();
  const { theme, setTheme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  const router = useRouter();
  const { setStep } = useStep();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    router.push("/");
  };

  const handleAddClick = () => {
    setStep(1);
    router.push("/add");
  };

  const iconStyle = (icon: string) =>
    `h-7 w-7 ${
      pathname === `/${icon}`
        ? "text-cyan-700 dark:text-cyan-500"
        : "text-neutral-500"
    } group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-all hover:scale-105`;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      id="desktopMenuMainContainer"
      className="fixed top-0 flex flex-col items-start bg-white dark:bg-neutral-800 shadow-lg h-full max-h-screen justify-between w-48 md:w-72 pl-5 md:pl-10 pb-10 "
    >
      <div id="logoContainer" className="flex flex-col items-start">
        <div
          id="logoImageContainer"
          className="flex items-center space-x-2 relative w-36 h-32"
        >
          <Image src={logo} alt="Logo" fill className="object-contain" />
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
          <button
            onClick={handleAddClick}
            className="flex items-center space-x-2 group"
          >
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
          </button>
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
              <div className="w-7 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className={`${iconStyle("user")} text-xl`}
                />
              </div>
              <span className="font-text text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 ease-in-out pl-2">
                Paramètres
              </span>
            </Link>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 group"
            >
              <div className="w-7 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={theme === "dark" ? faSun : faMoon}
                  className="text-xl text-neutral-700 dark:text-neutral-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 ease-in-ou opacity-70 dark:opacity-100"
                />
              </div>
              <span className="font-text text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 ease-in-out pl-2">
                {theme === "dark" ? "Mode clair" : "Mode sombre"}
              </span>
            </button>
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <div className="w-7 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className={`${iconStyle("")} text-xl`}
                />
              </div>
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
