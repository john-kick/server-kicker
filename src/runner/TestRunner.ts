import ServerRunner from "./ServerRunner";

export default class TestRunner extends ServerRunner {
  protected scriptName: string = "test.sh";
}

ServerRunner.registerRunner("test", new TestRunner());
