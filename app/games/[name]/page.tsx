"use client";

import { GameData, games } from "@/data/games";
import { StaticImageData } from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ServerCard from "../components/ServerCard";
import ServerInfo from "@/types/ServerInfo";
import ServerModal from "../components/ServerModal";

const servers = [
  {
    name: "PvP Arena Server",
    id: "pvp12345",
    description: "Test your skills in this intense PvP battle server!",
    playerCount: 10,
    maxPlayerCount: 20,
    active: false,
    startTime: 0
  },
  {
    name: "Another test server",
    id: "abcdefghij",
    description:
      "Nobody likes this server. I don't even know why it was even created or what it is for.",
    playerCount: 0,
    maxPlayerCount: 4,
    active: false,
    startTime: 0
  },
  {
    name: "Mega cool test server",
    id: "123456789",
    description:
      "The best server anyone has ever seen. In fact, this will be the best server to ever exist!",
    playerCount: 2,
    maxPlayerCount: 8,
    active: true, // The only active server
    startTime: Date.now() - 1234567
  },
  {
    name: "Adventure Quest Server",
    id: "advquest001",
    description:
      "Embark on epic adventures and quests in this RPG-style server.",
    playerCount: 5,
    maxPlayerCount: 15,
    active: false,
    startTime: 0
  },
  {
    name: "Sandbox Build Server",
    id: "sandbox123",
    description:
      "A creative server where you can build your dream worlds with unlimited resources.",
    playerCount: 12,
    maxPlayerCount: 25,
    active: false,
    startTime: 0
  },
  {
    name: "Zombie Survival Server",
    id: "zombie999",
    description:
      "Survive against waves of zombies in this thrilling survival server.",
    playerCount: 8,
    maxPlayerCount: 10,
    active: false,
    startTime: 0
  },
  {
    name: "Capture the Flag Server",
    id: "ctfserver7",
    description:
      "Compete in fast-paced Capture the Flag matches with your team!",
    playerCount: 6,
    maxPlayerCount: 12,
    active: false,
    startTime: 0
  }
];

export default function GamePage(): React.JSX.Element | null {
  const router = useRouter();
  const { name } = useParams();
  const [selectedServer, setSelectedServer] = useState<ServerInfo | null>(null);

  // useEffect(() => {
  //   if (name && typeof name === "string") {
  //     const foundGame = games[name];
  //     if (!foundGame) {
  //       router.push("/404");
  //     } else {
  //       setGame(foundGame);
  //     }
  //   }
  // }, [name, router]);

  if (typeof name !== "string" || !Object.keys(games).includes(name)) {
    router.push("/404");
    return null;
  }

  // Sort servers so the active server is always first
  const sortedServers = [...servers].sort(
    (a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0)
  );

  const handleSaveServerInfo = (updatedInfo: ServerInfo) => {
    // Logic to handle saving changes to the server info
    console.log("Updated server info:", updatedInfo);

    // Update the server info in the server list if needed
    setSelectedServer(null);
  };

  return (
    <>
      <h1 id="page-title">{games[name].title}</h1>
      <div className="server-list">
        {sortedServers.map((server) => (
          <ServerCard
            key={server.id}
            serverInfo={server}
            onClick={() => setSelectedServer(server)}
          />
        ))}
      </div>

      {selectedServer && (
        <ServerModal
          game={name}
          info={selectedServer}
          onClose={() => setSelectedServer(null)}
          onSave={handleSaveServerInfo}
        />
      )}
    </>
  );
}
