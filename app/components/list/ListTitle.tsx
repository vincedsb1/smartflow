import React from "react";

interface ListTitleProps {
  title: string; // Titre de la liste
}

const ListTitle: React.FC<ListTitleProps> = ({ title }) => {
  return (
    <div
      id="ListTitleContainer"
      className="mb-2 font-title font-bold text-md text-neutral-600 dark:text-neutral-300"
    >
      {title}
    </div>
  );
};

export default ListTitle;
