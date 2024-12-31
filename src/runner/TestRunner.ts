import Runner from "./Runner";

export default class TestRunner extends Runner {
  protected startedTrigger: RegExp = /[INFO] Script started/;
  protected stoppingTrigger: RegExp = /[INFO] Closing game server.../;
  protected stoppedTrigger: RegExp = /[INFO] Game server closed/;
  protected scriptName: string = "test.sh";

  protected detectCustomEvents(output: string) {
    if (output.includes("[DEBUG] Cleaning up resources")) {
      console.log("cleanup");
    }
  }

  protected getRunnable(): string {
    return "";
  }
}
