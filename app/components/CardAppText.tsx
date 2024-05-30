import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CardAppTextProps {
  text: string;
  icon?: IconProp;
  iconColor?: "normal" | "confirmation" | "warning" | "error";
}

function CardAppText({ text, icon, iconColor = "normal" }: CardAppTextProps) {
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
      className="bg-white dark:bg-neutral-800 rounded-2xl w-full flex flex-row py-6"
    >
      {icon && (
        <div
          id="hintIconMainContainer"
          className="flex justify-center items-center w-1/6"
        >
          <div
            id="hintIconContainer"
            className="w-12 h-12 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={icon} className={iconColorClass} />
          </div>
        </div>
      )}
      <div
        id="cardExplanationsText"
        className={`flex flex-row justify-start items-center ${
          icon ? "w-5/6" : "w-full"
        }`}
      >
        <p
          className="text-neutral-800 dark:text-neutral-400 font-text font-bold text-xl leading-6 p-2"
          id="tex-card"
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default CardAppText;
