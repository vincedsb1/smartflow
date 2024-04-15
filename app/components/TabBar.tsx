"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCirclePlus,
  faInbox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabBar: React.FC = () => {
  const pathname = usePathname();

  const iconStyle = (icon: string) =>
    `h-7 w-7 ${
      pathname === `/${icon}`
        ? "text-cyan-700 dark:text-cyan-500"
        : "text-neutral-500"
    } hover:text-cyan-600 dark:hover:text-cyan-400 transition-all hover:scale-105`;

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="border-t-2 border-neutral-400 dark:border-neutral-600">
        <div className="flex flex-row justify-around bg-neutral-300 dark:bg-neutral-800 p-2 h-20 items-center px-7 pb-7 ">
          <Link href="/today">
            <FontAwesomeIcon
              icon={faBookOpen}
              className={`${iconStyle("today")} text-xl`}
            />
          </Link>
          <Link href="/add">
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={`${iconStyle("add")} text-xl`}
            />
          </Link>
          <Link href="/organize">
            <FontAwesomeIcon
              icon={faInbox}
              className={`${iconStyle("organize")} text-xl`}
            />
          </Link>
          <Link href="/user">
            <FontAwesomeIcon
              icon={faUser}
              className={`${iconStyle("user")} text-xl`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
