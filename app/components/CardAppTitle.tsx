interface CardAppTitle {
  title: string;
}

function CardAppTitle({ title }: CardAppTitle) {
  return (
    <div id="title" className="h-11 ">
      <h1 className="text-neutral-800 dark:text-neutral-200 font-bold mb-2 text-2xl overflow-hidden text-overflow-ellipsis whitespace-nowrap">
        {title}
      </h1>
    </div>
  );
}

export default CardAppTitle;
