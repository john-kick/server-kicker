import Image, { StaticImageData } from "next/image";
import React from "react";

type CardProps = {
  img: StaticImageData;
  title: string;
  onClick?: () => void;
};

export default function GameCard({
  img,
  title,
  onClick
}: CardProps): React.JSX.Element {
  return (
    <div className="gamecard" onClick={onClick}>
      <Image alt={title} src={img} />
      <h5>{title}</h5>
    </div>
  );
}
