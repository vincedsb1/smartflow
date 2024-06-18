interface CardAppTitle {
  title: string;
  size?: "big" | "small";
}

function CardAppTitle({ title, size = "small" }: CardAppTitle) {
  const textSize =
    size === "small" ? "text-lg sm:text-md" : "text-xl sm:text-2xl md:text-3xl";

  return (
    <div id="title" className="">
      <h1
        className={`text-neutral-800 dark:text-neutral-200 font-title font-bold mb-2 ${textSize} overflow-hidden text-overflow-ellipsis  `}
      >
        {title}
      </h1>
    </div>
  );
}

export default CardAppTitle;
