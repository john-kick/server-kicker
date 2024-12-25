import { ChildProcess, spawn } from "node:child_process";
import { EventEmitter } from "node:events";
import { createWriteStream } from "node:fs";
import { join } from "node:path";

export default abstract class ServerRunner {
  public static readonly scriptsDir = "../../scripts";
  private static activeRunner: ServerRunner | null = null;

  private static runnersMap: Map<string, ServerRunner> = new Map();

  protected process: ChildProcess | undefined;
  protected abstract scriptName: string;
  protected eventEmitter = new EventEmitter();

  public static get currentRunner(): ServerRunner | null {
    return ServerRunner.activeRunner;
  }

  // Method to register a runner
  public static registerRunner(name: string, runner: ServerRunner): void {
    this.runnersMap.set(name, runner);
  }

  // Method to get a runner class by name
  public static getRunner(name: string): ServerRunner | undefined {
    return this.runnersMap.get(name);
  }

  public start(): void {
    if (ServerRunner.activeRunner) {
      throw new Error(
        `Another server runner is already active: ${ServerRunner.activeRunner.scriptName}`
      );
    }

    ServerRunner.activeRunner = this; // Set this instance as the active runner
    this.emit("starting", "[INFO] Server is starting...");

    if (!this.scriptName) {
      throw new Error("Script path is not defined.");
    }

    const logDir = "../../logs/server";
    const logFilePath = join(
      logDir,
      `${this.scriptName.replace(/[^a-zA-Z0-9]/g, "_")}.log`
    );
    const logStream = createWriteStream(logFilePath, { flags: "a" });

    this.process = spawn(
      "bash",
      [join(ServerRunner.scriptsDir, this.scriptName)],
      {
        stdio: ["pipe", "pipe", "pipe"]
      }
    );

    if (!this.process) {
      ServerRunner.activeRunner = null; // Reset active runner on failure
      throw new Error("Failed to spawn process.");
    }

    this.process.stdout?.on("data", (data) => {
      const output = data.toString().trim();
      logStream.write(output + "\n");
      this.detectBaseEvents(output);
      this.detectCustomEvents(output);
    });

    this.process.stderr?.on("data", (data) => {
      logStream.write(data.toString());
    });

    this.process.on("close", (code) => {
      this.emit("stopped", `[INFO] Server stopped with code ${code}`);
      logStream.write(`\n[INFO] Process exited with code ${code}\n`);
      logStream.end();
      ServerRunner.activeRunner = null; // Release lock
    });

    this.process.on("error", (err) => {
      logStream.write(`\n[ERROR] Process error: ${err.message}\n`);
      logStream.end();
      ServerRunner.activeRunner = null; // Release lock
    });

    this.emit("started", "[INFO] Server has started.");
  }

  public stop(): void {
    if (this.process) {
      this.emit("stopping", "[INFO] Server is stopping...");
      this.process.kill();
      ServerRunner.activeRunner = null; // Release lock when stopped
    }
  }

  public input(str: string): void {
    if (this.process?.stdin) {
      this.process.stdin.write(str + "\n");
    } else {
      throw new Error("Process is not running.");
    }
  }

  public on(eventType: string, listener: (output: string) => void): void {
    this.eventEmitter.on(eventType, listener);
  }

  protected emit(eventType: string, output: string): void {
    this.eventEmitter.emit(eventType, output);
  }

  private detectBaseEvents(output: string): void {
    if (output.includes("[INFO] Script started")) {
      this.emit("started", output);
    } else if (output.includes("[INFO] Closing game server")) {
      this.emit("stopping", output);
    } else if (output.includes("[INFO] Script finished")) {
      this.emit("stopped", output);
    }
  }

  protected detectCustomEvents(output: string): void {
    // Subclasses can override this to add their own event detection
  }
}
