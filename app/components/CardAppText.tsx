import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CardAppText {
  text: string;
  icon?: IconProp;
}

function CardAppText({ text, icon }: CardAppText) {
  return (
    <div
      id="cardExplanations"
      className={`bg-white dark:bg-neutral-800 rounded-2xl w-full flex flex-row py-6`}
    >
      {icon && (
        <div
          id="hintIconMainContainer"
          className="w-8/20 flex flex-row justify-center align-middle items-center"
        >
          <div
            id="hintIconContainer"
            className="w-12 h-12 flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={icon}
              className="text-neutral-800 dark:text-neutral-400 text-2xl"
            />{" "}
          </div>
        </div>
      )}
      <div
        id="cardExplanationsText"
        className="flex flex-row justify-start align-middle items-center"
      >
        <p
          className={`text-neutral-800 dark:text-neutral-400 font-text font-bold text-xl leading-6 ${
            icon ? "mr-8" : "mx-8"
          }`}
          id="tex-card"
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default CardAppText;
