import { ChildProcess, spawn } from "node:child_process";
import { EventEmitter } from "node:events";
import { createWriteStream, mkdirSync } from "node:fs";
import path, { join } from "node:path";
import config from "../util/config";

export type RunnerStatus = "starting" | "running" | "stopping" | "inactive";

export default abstract class Runner {
  public static readonly logsDir = "logs/server";
  private static activeRunner: Runner | null = null;
  private static runnersMap: Map<string, Runner> = new Map();

  protected process: ChildProcess | undefined;
  protected abstract scriptName: string;
  protected eventEmitter = new EventEmitter();
  private monitorInterval: NodeJS.Timeout | null = null;
  private startTimeout: NodeJS.Timeout | null = null;

  constructor(private status: RunnerStatus = "inactive") {}

  // Abstract properties for base event triggers
  protected abstract startedTrigger: RegExp;
  protected abstract stoppingTrigger: RegExp;
  protected abstract stoppedTrigger: RegExp;

  public static get currentRunner(): Runner | null {
    return Runner.activeRunner;
  }

  public static registerRunner(name: string, runner: Runner): void {
    this.runnersMap.set(name, runner);
  }

  public static getRunner(name: string): Runner | undefined {
    return this.runnersMap.get(name);
  }

  public static getStatus(): RunnerStatus | undefined {
    return Runner.activeRunner?.status;
  }

  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  public start(server: string, id: string, timeoutMs: number = 5000): void {
    if (Runner.activeRunner) {
      throw new Error(
        `Another server runner is already active: ${Runner.activeRunner.scriptName}`
      );
    }

    Runner.activeRunner = this;
    this.status = "starting";
    this.emit("starting", `[INFO] Server (${this.scriptName}) is starting...`);

    if (!this.scriptName) {
      throw new Error(`[${this.scriptName}] Script path is not defined.`);
    }

    mkdirSync(Runner.logsDir, { recursive: true });
    const logFilePath = join(
      Runner.logsDir,
      `${this.scriptName.replace(/[^a-zA-Z0-9]/g, "_")}.log`
    );
    const logStream = createWriteStream(logFilePath, { flags: "a" });

    this.process = spawn("bash", [this.getRunnable(server, id)], {
      stdio: ["pipe", "pipe", "pipe"]
    });

    if (!this.process) {
      Runner.activeRunner = null;
      throw new Error(`[${this.scriptName}] Failed to spawn process.`);
    }

    this.startTimeout = setTimeout(() => {
      if (this.status !== "running") {
        this.stop();
        throw new Error(
          `[${this.scriptName}] Runner failed to start within timeout (${timeoutMs}ms).`
        );
      }
    }, timeoutMs);

    this.process.stdout?.on("data", (data) => {
      const output = data.toString().trim();
      const timestampedOutput = `[${Runner.getTimestamp()}] ${output}`;
      logStream.write(timestampedOutput + "\n");
      this.detectBaseEvents(output);
      this.detectCustomEvents(output);
    });

    this.process.stderr?.on("data", (data) => {
      const timestampedError = `[${Runner.getTimestamp()}] [ERROR] ${data.toString()}`;
      logStream.write(timestampedError + "\n");
    });

    this.process.on("close", (code) => {
      const closeMessage = `[${Runner.getTimestamp()}] [INFO] Process exited with code ${code}`;
      this.emit("stopped", closeMessage);
      logStream.write(`\n${closeMessage}\n`);
      logStream.end();
      this.cleanup();
    });

    this.process.on("error", (err) => {
      const errorMessage = `[${Runner.getTimestamp()}] [ERROR] Process error: ${
        err.message
      }`;
      logStream.write(`\n${errorMessage}\n`);
      logStream.end();
      this.cleanup();
    });

    this.monitorResourceUsage();
  }

  public stop(): void {
    if (this.monitorInterval) clearInterval(this.monitorInterval);
    if (this.startTimeout) clearTimeout(this.startTimeout);

    if (this.process) {
      const stopMessage = `[${Runner.getTimestamp()}] [INFO] Server (${
        this.scriptName
      }) is stopping...`;
      this.emit("stopping", stopMessage);
      this.process.kill();
      this.cleanup();
    } else {
      throw new Error(`[${this.scriptName}] No running process to stop.`);
    }
  }

  private cleanup(): void {
    if (this.process) {
      this.process = undefined;
    }
    this.eventEmitter.removeAllListeners();
    Runner.activeRunner = null;
    this.status = "inactive";
  }

  public input(str: string): void {
    if (this.process?.stdin) {
      this.process.stdin.write(str + "\n");
    } else {
      throw new Error(`[${this.scriptName}] Process is not running.`);
    }
  }

  public on(eventType: string, listener: (output: string) => void): void {
    this.eventEmitter.on(eventType, listener);
  }

  protected emit(eventType: string, output: string): void {
    const timestampedOutput = `[${Runner.getTimestamp()}] ${output}`;
    this.eventEmitter.emit(eventType, timestampedOutput);
  }

  private detectBaseEvents(output: string): void {
    if (this.startedTrigger.test(output)) {
      this.status = "running";
      this.emit("started", output);
    } else if (this.stoppingTrigger.test(output)) {
      this.emit("stopping", output);
    } else if (this.stoppedTrigger.test(output)) {
      this.emit("stopped", output);
    }
  }

  protected detectCustomEvents(output: string): void {
    // Subclasses can override this to add their own event detection
  }

  private monitorResourceUsage(): void {
    this.monitorInterval = setInterval(() => {
      if (this.process?.pid) {
        const usage = process.memoryUsage(); // Replace with a library like `pidusage` for accurate stats
        console.log(
          `[${this.scriptName}] Memory Usage: ${(
            usage.rss /
            1024 /
            1024
          ).toFixed(2)} MB`
        );
      }
    }, 5000);
  }

  protected getRunnable(server: string, id: string): string {
    return path.join(config.SERVER_LOCATION, server, id, "start.sh");
  }
}
