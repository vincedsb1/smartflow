"use client";

import {
  faChevronLeft,
  faChevronRight,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import List from "../../components/List";
import { UserContext } from "@/app/context/UserContext";
import { Card, CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { link } from "fs";

interface Category {
  id: number;
  name: string;
  colorName: string;
}

const OrganizeCategories = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [myModalIsOpen, setMyModalIsOpen] = useState(false);
  const [myModalTitle, setMyModalTitle] = useState("");
  const [myModalContent, setMyModalContent] = useState("");
  const user = useContext(UserContext);

  // Fetch categories
  useEffect(() => {
    if (!userContext.token || !userContext.user) {
      console.error("User or token is not defined");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    console.log("Token:", userContext.token);

    fetch("/api/categories", {
      headers: {
        Authorization: `Bearer ${userContext.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCategories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [userContext.token, userContext.user]);

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-row justify-center items-center w-full">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  const rows = categories.map((category) => ({
    link: "/organize/categories/review?id=" + category.id + "&nbcategories=" + categories.length,
    mainLabel: category.name,
    color: category.colorName,
  }));
  console.log("rows:", rows);

  return (
    <div
      id="organizeMainContainer"
      className="flex flex-col justify-between min-h-screen w-full"
    >
      <div
        id="organizeContainer"
        className="flex flex-col justify-center w-full"
      >
        <div id="themeSwitcherBackIcon" className="w-full flex flex-col mt-16">
          <Link href="/organize">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5"
            />
          </Link>
        </div>
        <div id="organizeList" className="">
          <List
            rows={rows}
            title="Catégories"
            isLargeRow={false}
            setModalIsOpen={setMyModalIsOpen}
            setModalTitle={setMyModalTitle}
            setModalContent={setMyModalContent}
            modalContent={myModalContent}
            belowListLink="Ajouter une catégorie"
            onBelowListLinkClick={() => router.push("/organize/addCategory")}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizeCategories;
