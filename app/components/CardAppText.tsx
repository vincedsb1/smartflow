import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CardAppText {
  text: string;
  icon?: IconProp;
  size?: "small" | "large";
}

function CardAppText({ text, icon, size = "small" }: CardAppText) {
  const lineCount = (text.match(/\n/g) || []).length + 1;

  return (
    <div
      id="cardExplanations"
      className={`bg-neutral-50 rounded-xl w-full flex flex-row py-6`}
    >
      {icon && (
        <div
          id="hintIconMainContainer"
          className="w-1/6 flex flex-row justify-center align-middle items-center "
        >
          <div
            id="hintIconContainer"
            className="w-8 h-8 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={icon} className="text-neutral-800 text-xl" />{" "}
          </div>
        </div>
      )}
      <div
        id="cardExplanationsText"
        className="flex flex-row justify-start align-middle items-center"
      >
        <p
          className="text-neutral-800 font-quicksand-600 text-xl m-3 "
          id="tex-card"
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default CardAppText;
