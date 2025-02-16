import minecraftServer from "@/data/api-test-data/minecraftServer";
import { NextRequest, NextResponse } from "next/server";
import { ServerController } from "@/controllers/ServerController";

const serverController = new ServerController();

export async function GET(
  request: NextRequest,
  { params }: { params: PromiseLike<{ game: string }> }
) {
  const { game } = await params;

  if (game !== "minecraft") {
    return NextResponse.json({ error: "Game not supported" }, { status: 404 });
  }

  return NextResponse.json(Object.keys(minecraftServer));
}

export async function POST(
  request: NextRequest,
  { params }: { params: PromiseLike<{ game: string }> }
) {
  try {
    const body = await request.json();
    const { game } = await params;

    // Validate that the game type is supported
    const supportedGames = ["minecraft", "satisfactory", "wreckfest"];
    if (!supportedGames.includes(game)) {
      return NextResponse.json(
        { error: "Game not supported" },
        { status: 404 }
      );
    }

    // Validate the 'name' field
    if (!body.name) {
      return NextResponse.json(
        { error: "The 'name' field is required." },
        { status: 400 }
      );
    }

    // Create the server using the ServerController
    const newServerId = await serverController.createServer(game, body);

    // Convert insertId to string before returning it
    return NextResponse.json(
      { message: "Server created successfully", id: newServerId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating server:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
