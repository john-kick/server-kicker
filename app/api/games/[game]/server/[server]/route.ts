import minecraftServer from "@/data/api-test-data/minecraftServer";
import satisfactoryServer from "@/data/api-test-data/satisfactoryServer";
import wreckfestServer from "@/data/api-test-data/wreckfestServer";
import { games as gameServers } from "@/data/games";
import { MinecraftServerConfigKey } from "@/data/MinecraftServerConfiguration";
import { SatisfactoryServerConfigKey } from "@/data/SatisfactoryServerConfiguration";
import { WreckfestServerConfigKey } from "@/data/WreckfestServerConfiguration";
import { NextRequest, NextResponse } from "next/server";

type ServerConfigKey =
  | MinecraftServerConfigKey
  | SatisfactoryServerConfigKey
  | WreckfestServerConfigKey;

const gamesMap: Record<string, Record<ServerConfigKey, any>> = {
  minecraft: minecraftServer,
  satisfactory: satisfactoryServer,
  wreckfest: wreckfestServer
};

export async function GET(
  request: NextRequest,
  context: { params: PromiseLike<{ game: string; server: string }> }
) {
  const { game, server } = await context.params;

  if (!gameServers[game]) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  const gameServer = gamesMap[game];

  if (!gameServer || !(server in gameServer)) {
    return NextResponse.json({ error: "Server not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: server,
    params: gameServer[server as keyof typeof gameServer]
  });
}
