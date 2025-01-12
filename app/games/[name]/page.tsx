"use client";

import GameCard from "@/app/components/GameCard";
import { games } from "@/app/data/games";
import { StaticImageData } from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GamePage(): React.JSX.Element {
  const router = useRouter();
  const params = useParams();
  const [game, setGame] = useState<{
    name: string;
    title: string;
    image: StaticImageData;
  } | null>(null);

  useEffect(() => {
    if (params?.name) {
      const foundGame = games.find((g) => g.name === params.name);
      if (!foundGame) {
        router.push("/404");
      } else {
        setGame(foundGame);
      }
    }
  }, [params?.name, router]);

  const toDashboard = () => {
    router.push("/dashboard");
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return <GameCard img={game.image} title={game.title} onClick={toDashboard} />;
}
