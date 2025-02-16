import minecraftServer from "@/data/api-test-data/minecraftServer";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { game: string } }
) {
  const { game } = params;

  return NextResponse.json(Object.keys(minecraftServer));
}
