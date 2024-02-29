import Image from "next/image";

interface CardAppImageProps {
  src: string;
  alt: string;
}

function CardAppImage({ src, alt }: CardAppImageProps) {
  return (
    <div id="logo-explanations" className="flex justify-center">
      <Image
        width={0}
        height={0}
        src={src}
        alt={alt}
        className="w-48 h-48 object-contain"
      />
    </div>
  );
}

export default CardAppImage;
