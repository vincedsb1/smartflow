import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CardAppText {
  text: string;
  icon?: IconProp;
}

function CardAppText({ text, icon }: CardAppText) {
  return (
    <div
      id="card-explanations"
      className="bg-neutral-50 rounded-3xl w-80 h-36 mb-10 flex justify-center items-center"
    >
      {icon && <FontAwesomeIcon icon={icon} className="ml-4"/>}
      <p
        className="text-neutral-800 font-quicksand-600 text-xl p-3 text-center"
        id="tex-card"
      >
        {text}
      </p>
    </div>
  );
}

export default CardAppText;
