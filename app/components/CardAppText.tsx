import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CardAppTextProps {
  text: string;
  icon?: IconProp;
  iconColor?: "normal" | "confirmation" | "warning" | "error";
  shadow?: boolean;
  colorVariant?: boolean;
}

const CardAppText = ({
  text,
  icon,
  iconColor = "normal",
  shadow = false,
  colorVariant = false,
}: CardAppTextProps) => {
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

  const shadowClass = shadow ? "shadow-lg" : "";
  const colorVariantClass = colorVariant
    ? "bg-white dark:bg-neutral-700"
    : "bg-white dark:bg-neutral-800";
  const containerClassName = `${shadowClass} ${colorVariantClass} rounded-2xl w-full flex flex-row p-2`;
  console.log("colorVariant : ", colorVariant);
  console.log("containerClassName : ", containerClassName);

  return (
    <div id="cardExplanations" className={containerClassName}>
      {icon && (
        <div
          id="hintIconMainContainer"
          className="flex justify-center items-center w-4/20 sm:w-14 min-h-16"
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
        className={`flex flex-row justify-start items-center ml-0 ${
          icon ? "w-16/20" : "w-full"
        }`}
      >
        <p
          className="text-neutral-800 dark:text-neutral-400 font-text font-bold text-xl leading-6 p-2"
          id="tex-card"
          dangerouslySetInnerHTML={{ __html: text }} // Utiliser dangerouslySetInnerHTML
        />
      </div>
    </div>
  );
};

export default CardAppText;
