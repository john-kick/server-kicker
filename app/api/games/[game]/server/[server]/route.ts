import { ServerController } from "@/controllers/ServerController";
import { games as gameServers } from "@/data/games";
import { NextRequest, NextResponse } from "next/server";

const serverController = new ServerController();

export async function GET(
  request: NextRequest,
  context: { params: PromiseLike<{ game: string; server: string }> }
) {
  const { game, server } = await context.params;

  const serverId = parseInt(server, 10);
  if (isNaN(serverId)) {
    return NextResponse.json({ error: "Invalid server ID" }, { status: 400 });
  }

  try {
    const serverData = await serverController.getServerById(game, serverId);
    if (!serverData) {
      return NextResponse.json({ error: "Server not found" }, { status: 404 });
    }

    return NextResponse.json(serverData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
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
