import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CardAppText {
  text: string;
  icon?: IconProp;
  iconColor?: "normal" | "confirmation" | "warning" | "error";
}

function CardAppText({ text, icon, iconColor = "normal" }: CardAppText) {
  let iconColorClass: string;
  switch (iconColor) {
    case "confirmation":
      iconColorClass = "text-emerald-500 dark:text-emerald-400 text-3xl";
      break;
    case "warning":
      iconColorClass = "text-orange-800 dark:text-orange-400 text-3xl";
      break;
    case "error":
      iconColorClass = "text-red-800 dark:text-red-400 text-3xl";
      break;
    case "normal":
      iconColorClass = "text-cyan-700 dark:text-cyan-500 text-3xl";
      break;
    default:
      iconColorClass = "text-primary dark:text-neutral-400 text-2xl";
  }

  return (
    <div
      id="cardExplanations"
      className={`bg-white dark:bg-neutral-800 rounded-2xl w-full flex flex-row py-6`}
    >
      {icon && (
        <div
          id="hintIconMainContainer"
          className="w-4/20 flex flex-row justify-center align-middle items-center "
        >
          <div
            id="hintIconContainer"
            className="w-12 h-12 flex items-center justify-center "
          >
            <FontAwesomeIcon icon={icon} className={`${iconColorClass}`} />
          </div>
        </div>
      )}
      <div
        id="cardExplanationsText"
        className="w-16/20 flex flex-row justify-start align-middle items-center"
      >
        <p
          className={`text-neutral-800 dark:text-neutral-400 font-text font-bold text-xl leading-6 line-clamp-3 ${
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
