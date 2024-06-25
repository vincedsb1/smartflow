"use client";
import React, { ChangeEvent, useContext, useState, useEffect } from "react";
import { Link as NextUILink } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import CardAppTitle from "../components/CardAppTitle";
import CardAppText from "../components/CardAppText";
import CardAppPasswordInput from "../components/CardAppPasswordInput";
import { UserContext } from "../context/UserContext";
import { Checkbox } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";

const ConnexionPage = () => {
  const userContext = useContext(UserContext);
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { email, firstname, birthday, setUser } = userContext;
  const [password, setPassword] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeCgu = (event: ChangeEvent<HTMLInputElement>) => {
    setHasAcceptedTerms(event.target.checked);
  };

  const router = useRouter();

  const handleSubmit = async () => {
    if (!password) {
      alert("Veuillez entrer un mot de passe");
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        birthday: birthday,
        lastname: "Default",
        onBoarding: false,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      userContext.setToken(data.token);

      const deleteResponse = await fetch(
        `/api/emailverification/delete-emailverification?email=${email}`,
        {
          method: "DELETE",
        }
      );

      if (deleteResponse.ok) {
        console.log(
          "Utilisateur enregistré et vérification par e-mail supprimée avec succès"
        );

        setTimeout(async () => {
          console.log(
            "Tentative de connexion avec l'email et le mot de passe suivants :",
            email,
            password
          );
          const response = await fetch("/api/users/check-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.status === "ok") {
              console.log("Token reçu de l'API (Page connexion) :", data.token);
              userContext.setToken(data.token);
              console.log("Token défini dans userContext");
              router.push("/onboarding");
              console.log("Redirigé vers /onboarding");
              setUser({ email, firstname, birthday, setUser });
              console.log("Utilisateur défini");
            }
          }
        }, 1000);
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const widthCondition = window.innerWidth >= 1280; // xl breakpoint
      const heightCondition = window.innerHeight >= 896; // custom height condition
      setShowLogo(widthCondition || heightCondition);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Check on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="mailAuthMainContainer"
      className="flex flex-col items-center justify-center w-full h-full min-h-screen"
    >
      {/* Desktop version */}
      <div
        id="mailAuthDesktop"
        className="hidden sm:flex h-full w-full flex-col justify-center items-center"
      >
        {showLogo && (
          <div
            id="logoContainer"
            className="absolute sm:top-0 sm:left-0 flex-row justify-start items-center h-16 w-full p-4"
          >
            <Image
              src={logo}
              alt="logo"
              width={151}
              height={38}
              priority={true}
            />
          </div>
        )}
        <div
          id="desktopVersion"
          className="hidden sm:flex w-16/20 lg:w-16/20 h-[600px] bg-white shadow-lg rounded-2xl flex-row items-start justify-between border-3 border-neutral-200 mx-auto my-auto max-w-[800px] max-h-[600px] overflow-hidden"
        >
          <div
            id="desktopImageContainer"
            className="flex w-1/2 h-full relative"
          >
            <Image
              src="/images/entryVisual.svg"
              alt="Entry Visual"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
            <div
              id="desktopWelcomeTextContainer"
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <h2 className="text-4xl font-bold font-text text-cyan-900">
                Bienvenue
              </h2>
            </div>
          </div>
          <div
            id="desktopContentContainer"
            className="flex flex-col items-center dark:bg-neutral-800 w-1/2 h-full justify-start p-8 dark:rounded-tr-2xl dark:rounded-br-2xl"
          >
            <div
              id="desktopTitleContainer"
              className="flex flex-col items-start w-full mt-0"
            >
              <CardAppText
                text="Choisissez un mot de passe"
                icon={faUser}
                shadow
              />
            </div>
            <form
              id="formContainer"
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full mt-10"
            >
              <CardAppPasswordInput onChange={handlePasswordChange} />
              <div className="w-4/5 flex items-center mt-14">
                <Checkbox
                  size="md"
                  onChange={handleChangeCgu}
                  className="font-text"
                  isSelected={hasAcceptedTerms}
                >
                  J&apos;accepte les conditions générales d&apos;utilisation
                </Checkbox>
              </div>
              <div className="w-4/5 flex flex-row justify-start mb-4 ml-4 mt-1 3xs:mt-0">
                <NextUILink href="/cgu">Consulter les CGU</NextUILink>
              </div>
              <Button
                color={password && hasAcceptedTerms ? "primary" : "default"}
                size="lg"
                disabled={!(password && hasAcceptedTerms)}
                onClick={handleSubmit}
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80 font-bold font-text"
              >
                Continuer
              </Button>
            </form>
          </div>
        </div>
      </div>
      {/* Mobile version */}
      <div
        id="mailAuthMobile"
        className="sm:hidden w-full h-full flex flex-col flex-grow justify-between items-center "
      >
        <div
          id="MailAuthMobileTop"
          className="flex flex-col items-center justify-center w-full "
        >
          <div
            id="chevronContainer"
            className="sm:hidden flex flex-row justify-start items-center h-16 w-full mt-4 xs:mt-6 2xs:mt-8 3xs:mt-10 sm:mt-16 ml-0"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-neutral-800 dark:text-neutral-200 text-xs w-4 h-4 m-5 cursor-pointer"
              onClick={handleBack}
            />
          </div>

          <div
            id="mobileTitleMainContainer"
            className="flex flex-col items-center justify-center w-full mt-4 xs:mt-6 2xs:mt-8 3xs:mt-10 sm:mt-12"
          >
            <div
              id="mobileTitleContainer"
              className="flex flex-col items-start"
            >
              <CardAppTitle title="Votre profil" size="big" />

              <div
                id="mobileTextContainer"
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80  mb-10"
              >
                <CardAppText text="Choisissez un mot de passe" icon={faUser} />
              </div>
            </div>
          </div>
        </div>
        <div
          id="mailAuthMobileBottom"
          className="flex flex-col items-center pb-4 xs:pb-24 2xs:pb-24 3xs:pb-24 sm:pb-24"
        >
          <form
            id="formContainer"
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <div
              id="mobileInputContainer"
              className="w-full pb-10 xs:pb-12 2xs:pb-16 3xs:pb-20 sm:pb-32"
            >
              <CardAppPasswordInput onChange={handlePasswordChange} />
            </div>
            <div className="w-4/5 flex items-center mt-14">
              <Checkbox
                size="md"
                onChange={handleChangeCgu}
                className="font-text"
                isSelected={hasAcceptedTerms}
              >
                J&apos;accepte les conditions générales d&apos;utilisation
              </Checkbox>
            </div>
            <div className="w-4/5 flex flex-row justify-start mb-4 ml-4 mt-1 3xs:mt-0">
              <NextUILink href="/cgu">Consulter les CGU</NextUILink>
            </div>
            <div id="mobileButtonContainer" className="">
              <Button
                color={password && hasAcceptedTerms ? "primary" : "default"}
                size="lg"
                disabled={!(password && hasAcceptedTerms)}
                onClick={handleSubmit}
                className="w-60 xs:w-64 2xs:w-72 3xs:w-80 font-bold font-text"
              >
                Continuer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnexionPage;
