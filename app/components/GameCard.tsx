import Image, { StaticImageData } from "next/image";
import React from "react";

type CardProps = {
  img: StaticImageData; // Static image data (from Next.js)
  title: string; // Title to display on the card
  onClick?: () => void; // Function to execute when card is clicked
};

export default function GameCard({
  img,
  title,
  onClick
}: CardProps): React.JSX.Element {
  return (
    <div className="gamecard" onClick={onClick}>
      <Image alt={title} src={img} />
      <h6>{title}</h6>
    </div>
  );
}
