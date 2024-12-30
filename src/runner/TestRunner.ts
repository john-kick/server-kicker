import ServerRunner from "./ServerRunner";

export default class TestRunner extends ServerRunner {
  protected scriptName: string = "test.sh";

  protected detectCustomEvents(output: string) {
    if (output.includes("[DEBUG] Cleaning up resources")) {
      console.log("cleanup");
    }
  }
}
