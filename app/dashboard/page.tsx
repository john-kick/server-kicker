"use client";

import GameCard from "@/components/GameCard";
import { useRouter } from "next/navigation";
import { games } from "@/data/games";

export default function Page(): React.JSX.Element {
  const router = useRouter();

  const toGamePage = (game: string) => {
    router.push(`/games/${game}`);
  };

  return (
    <div>
      {Object.entries(games).map(([name, { image, title }]) => (
        <GameCard
          key={name}
          img={image}
          title={title}
          onClick={() => toGamePage(name)}
        />
      ))}
    </div>
  );
}
