import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CardAppText {
  text: string;
  icon?: IconProp;
  size?: "small" | "large";
}

function CardAppText({ text, icon, size = "small" }: CardAppText) {
  const lineCount = (text.match(/\n/g) || []).length + 1;
  const divHeight = size === "large" ? "h-24" : "h-12";

  return (
    <div
      id="card-explanations"
      className={`bg-neutral-50 rounded-xl w-80 ${divHeight} flex flex-row`}
    >
      {icon && (
        <div className="w-1/6 flex flex-row justify-center align-middle items-center">
          <FontAwesomeIcon
            icon={icon}
            className="text-neutral-800 text-xs h-7"
          />{" "}
        </div>
      )}
      <div className="flex flex-row justify-center align-middle items-center">
        <p
          className="text-neutral-800 font-quicksand-600 text-xl p-3 text-center"
          id="tex-card"
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default CardAppText;
