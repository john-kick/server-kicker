import Runner from "./Runner";

export default class TestRunner extends Runner {
  protected name: string = "test";
  protected startedTrigger: RegExp = /[INFO] Script started/;
  protected stoppingTrigger: RegExp = /[INFO] Closing game server.../;
  protected stoppedTrigger: RegExp = /[INFO] Game server closed/;

  protected detectCustomEvents(output: string) {
    if (output.includes("[DEBUG] Cleaning up resources")) {
      console.log("cleanup");
    }
  }

  protected getRunnable(): string {
    return "";
  }
}
