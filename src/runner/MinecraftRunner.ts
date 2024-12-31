import path from "path";
import Runner from "./Runner";
import config from "../util/config";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

export default class MinecraftRunner extends Runner {
  protected name: string = "minecraft";
  protected startedTrigger: RegExp = /[Server thread/INFO]: Done/;
  protected stoppingTrigger: RegExp =
    /[Server thread/INFO]: Stopping the server/;
  protected stoppedTrigger: RegExp =
    /[Server thread/INFO]: ThreadedAnvilChunkStorage: All dimensions are saved/;

  protected getRunnable(id: string): string {
    return path.join(config.SERVER_LOCATION, "minecraft", id, "start.sh");
  }

  protected validateInstallation(id: string): void {
    // Check if the server directory exists
    const serverFiles = path.join(config.SERVER_LOCATION, "minecraft", id);
    if (!existsSync(serverFiles)) {
      throw new Error("Invalid installation, server directory does not exist");
    }

    // Accept EULA
    writeFileSync(path.join(serverFiles, "eula.txt"), "eula=true", "utf-8");

    // Check if necessary files are present
    if (!existsSync(path.join(serverFiles, "server.jar"))) {
      throw new Error("Invalid installation, server.jar does not exist");
    }

    if (!existsSync(path.join(serverFiles, "start.sh"))) {
      throw new Error("Invalid installation, start.sh does not exist");
    }
  }
}
