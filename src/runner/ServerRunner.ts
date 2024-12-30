import { ChildProcess, spawn } from "node:child_process";
import { EventEmitter } from "node:events";
import { createWriteStream, mkdirSync } from "node:fs";
import { join } from "node:path";

export type RunnerStatus = "starting" | "running" | "stopping" | "inactive";

export default abstract class ServerRunner {
  public static readonly scriptsDir = "scripts";
  public static readonly logsDir = "logs/server";
  private static activeRunner: ServerRunner | null = null;

  private static runnersMap: Map<string, ServerRunner> = new Map();

  protected process: ChildProcess | undefined;
  protected abstract scriptName: string;
  protected eventEmitter = new EventEmitter();

  constructor(private status: RunnerStatus = "inactive") {}

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

  public static getStatus(): RunnerStatus | undefined {
    return ServerRunner.activeRunner?.status;
  }

  private static getTimestamp(): string {
    return new Date().toISOString(); // Use ISO format for timestamps
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

    mkdirSync(ServerRunner.logsDir, { recursive: true });
    const logFilePath = join(
      ServerRunner.logsDir,
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
      ServerRunner.activeRunner = null;
      throw new Error("Failed to spawn process.");
    }

    this.process.stdout?.on("data", (data) => {
      const output = data.toString().trim();
      const timestampedOutput = `[${ServerRunner.getTimestamp()}] ${output}`;
      logStream.write(timestampedOutput + "\n");
      this.detectBaseEvents(output);
      this.detectCustomEvents(output);
    });

    this.process.stderr?.on("data", (data) => {
      const timestampedError = `[${ServerRunner.getTimestamp()}] ${data.toString()}`;
      logStream.write(timestampedError);
    });

    this.process.on("close", (code) => {
      const closeMessage = `[${ServerRunner.getTimestamp()}] [INFO] Process exited with code ${code}`;
      this.emit("stopped", closeMessage);
      logStream.write(`\n${closeMessage}\n`);
      logStream.end();
      ServerRunner.activeRunner = null;
    });

    this.process.on("error", (err) => {
      const errorMessage = `[${ServerRunner.getTimestamp()}] [ERROR] Process error: ${
        err.message
      }`;
      logStream.write(`\n${errorMessage}\n`);
      logStream.end();
      ServerRunner.activeRunner = null;
    });

    this.emit("starting", "[INFO] Server has started.");
  }

  public stop(): void {
    if (this.process) {
      const stopMessage = `[${ServerRunner.getTimestamp()}] [INFO] Server is stopping...`;
      this.emit("stopping", stopMessage);
      this.process.kill();
      ServerRunner.activeRunner = null;
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
    const timestampedOutput = `[${ServerRunner.getTimestamp()}] ${output}`;
    this.eventEmitter.emit(eventType, timestampedOutput);
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
