import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCirclePlus,
  faInbox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  active: string;
}

const TabBar: React.FC<Props> = ({ active }) => {
  const iconStyle = (icon: string) =>
    `h-10 w-10 ${
      active === icon
        ? "text-gradient-to-br from-cyan-400 to-cyan-500"
        : "text-neutral-300"
    } hover:text-cyan-600 transition-all hover:scale-105`;

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="border-t-2 border-neutral-300">
        <div className="flex flex-row justify-around bg-white p-2  h-16 items-center">
          <FontAwesomeIcon
            icon={faBookOpen}
            className={`${iconStyle("book-open")} text-2xl`}
          />
          <FontAwesomeIcon
            icon={faCirclePlus}
            className={`${iconStyle("circle-plus")} text-2xl`}
          />
          <FontAwesomeIcon
            icon={faInbox}
            className={`${iconStyle("inbox")} text-2xl`}
          />
          <FontAwesomeIcon
            icon={faUser}
            className={`${iconStyle("user")} text-2xl`}
          />
        </div>
      </div>
    </div>
  );
};

export default TabBar;
