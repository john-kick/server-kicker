import { ServerController } from "@/controllers/ServerController";
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

const serverController = new ServerController();

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

export async function PATCH(
  request: NextRequest,
  context: { params: PromiseLike<{ game: string; server: string }> }
) {
  const { game, server } = await context.params;

  if (!gameServers[game]) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  try {
    const serverId = parseInt(server, 10);
    if (isNaN(serverId)) {
      return NextResponse.json({ error: "Invalid server ID" }, { status: 400 });
    }

    const body = await request.json();
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "No fields provided for update" },
        { status: 400 }
      );
    }

    const updated = await serverController.updateServer(game, serverId, body);

    if (!updated) {
      return NextResponse.json(
        { error: "Server not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Server ${serverId} updated successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: PromiseLike<{ game: string; server: string }> }
) {
  const { game, server } = await context.params;

  if (!gameServers[game]) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  try {
    const serverId = parseInt(server, 10);
    if (isNaN(serverId)) {
      return NextResponse.json({ error: "Invalid server ID" }, { status: 400 });
    }

    const deleted = await serverController.deleteServer(game, serverId);

    if (!deleted) {
      return NextResponse.json(
        { error: "Server not found or could not be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Server ${serverId} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
