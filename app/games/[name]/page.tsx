"use client";

import { games } from "@/data/games";
import { StaticImageData } from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ServerCard from "../components/ServerCard";

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

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 id="page-title">{game.title}</h1>
      <div>
        <ServerCard name="Mega cool test server" id="123456789" />
      </div>
    </>
  );
}
