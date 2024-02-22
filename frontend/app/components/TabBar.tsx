import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCirclePlus,
  faInbox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Props {
  active: string;
}

const TabBar: React.FC<Props> = ({ active }) => {
  const iconStyle = (icon: string) =>
    `h-7 w-7 ${
      active === icon
        ? "text-gradient-to-br from-cyan-400 to-cyan-500"
        : "text-neutral-300"
    } hover:text-cyan-600 transition-all hover:scale-105`;

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="border-t-2 border-neutral-300">
        <div className="flex flex-row justify-around bg-white p-2 h-20 items-center px-7 pb-7">
          <Link href="/today">
            <FontAwesomeIcon
              icon={faBookOpen}
              className={`${iconStyle("book-open")} text-xl`}
            />
          </Link>
          <Link href="/add">
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={`${iconStyle("circle-plus")} text-xl`}
            />
          </Link>
          <Link href="/organize">
            <FontAwesomeIcon
              icon={faInbox}
              className={`${iconStyle("inbox")} text-xl`}
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
