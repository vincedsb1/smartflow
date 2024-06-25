"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import List from "../../components/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSun,
  faMoon,
  faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DesktopMenu from "../../components/DesktopMenu";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeOptions = [
    { label: "Light mode", value: "light", icon: faSun },
    { label: "Dark mode", value: "dark", icon: faMoon },
    { label: "System", value: "system", icon: faCircleHalfStroke },
  ];

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full sm:max-w-[1170px]  bg-neutral-200 sm:shadow-2xl sm:shadow-neutral-200 flex flex-row ">
        <div className="hidden sm:block">
          <DesktopMenu />
        </div>
        <div
          id="themeSwitcherMainContainer"
          className=" w-full sm:ml-48 md:ml-72 flex flex-col items-center min-h-screen "
        >
          <div id="themeSwitcherBackIcon" className="w-full flex flex-col">
            <Link href="/user">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
              />
            </Link>
          </div>
          <div id="themeSwitcherList" className="w-full flex flex-col sm:w-3/4 ml:w-3/4">
            <List
              rows={themeOptions.map((option) => ({
                mainLabel: option.label,
                onClick: () => setTheme(option.value),
                selected: theme === option.value,
                icon: option.icon,
              }))}
              title="Thème"
              isLargeRow={false}
              modalIsOpen={false}
              setModalIsOpen={() => { }}
              setModalTitle={() => { }}
              setModalContent={() => { }}
              modalTitle=""
              modalContent=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
