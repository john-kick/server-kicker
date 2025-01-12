"use client";

import GameCard from "../components/GameCard";
import minecraft from "../../public/images/Minecraft.png";
import satisfactory from "../../public/images/Satisfactory.png";
import { useRouter } from "next/navigation";

export default function Page(): React.JSX.Element {
  const router = useRouter();

  const toGamePage = (game: string) => {
    router.push("/games/" + game);
  };

  const games = [
    { name: "minecraft", image: minecraft },
    { name: "satisfactory", image: satisfactory }
  ];

  return (
    <div>
      {games.map(({ name, image }) => (
        <GameCard
          className="pe-3"
          key={name}
          img={image}
          title={name.toUpperCase()}
          onClick={() => {
            toGamePage(name);
          }}
        />
      ))}
    </div>
  );
}
