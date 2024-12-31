import Runner from "./Runner";

export default class MinecraftRunner extends Runner {
  protected scriptName: string = "minecraft.sh";
  protected startedTrigger: RegExp = /[Server thread/INFO]: Done/;
  protected stoppingTrigger: RegExp =
    /[Server thread/INFO]: Stopping the server/;
  protected stoppedTrigger: RegExp =
    /[Server thread/INFO]: ThreadedAnvilChunkStorage: All dimensions are saved/;
}
