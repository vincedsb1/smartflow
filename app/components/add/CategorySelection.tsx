import { faTag } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import List from "../../components/List";
import { UserContext } from "@/app/context/UserContext";
import CardAppText from "../CardAppText";
import CardAppTitle from "../CardAppTitle";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  colorName: string;
}

const CategorySelection = () => {
  const [myModalIsOpen, setMyModalIsOpen] = useState(false);
  const [myModalTitle, setMyModalTitle] = useState("");
  const [myModalContent, setMyModalContent] = useState("");
  const router = useRouter();
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const user = useContext(UserContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  console.log("Token:", userContext.token);
  useEffect(() => {
    if (!userContext.token || !userContext.user) {
      console.error("User or token is not defined");
      setIsError(true);
      setIsLoading(false);
      return;
    }

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
        setCategories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [userContext.token, userContext.user]);

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
    mainLabel: category.name,
    color: category.colorName,
  }));

  return (
    <div id="addMainContainer" className="flex flex-col justify-between w-full">
      <div id="addTopContainer" className="flex flex-col justify-center w-full">
        <div
          id="addHeaderContainer"
          className="flex flex-col justify-center items-center w-full "
        >
          <div id="addTitle" className="flex flex-col w-16/20 ">
            <CardAppTitle title="Nouvelle fiche" size="big" />
          </div>
          <div id="addHint" className="flex flex-col items-center w-16/20 mb-8">
            <CardAppText
              text="Dans quelle catégorie voulez-vous ranger la fiche ?"
              icon={faTag}
            />
          </div>
          <div id="categoryList" className="w-18/20">
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
              selectable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
