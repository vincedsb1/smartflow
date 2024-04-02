interface CardAppTitle {
  title: string;
  size?: "big" | "small";
}

function CardAppTitle({ title, size = "small" }: CardAppTitle) {
  const textSize = size === "small" ? "text-md" : "text-2xl";

  return (
    <div id="title" className="">
      <h1
        className={`text-neutral-800 dark:text-neutral-200 font-title font-bold mb-2 ${textSize} overflow-hidden text-overflow-ellipsis whitespace-nowrap`}
      >
        {title}
      </h1>
    </div>
  );
}

export default CardAppTitle;
