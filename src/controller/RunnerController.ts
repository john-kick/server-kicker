import { Request, Response } from "express";
import BaseController from "./BaseController";
import ServerRunner from "../runner/ServerRunner"; // Adjust import path as needed

export default class RunnerController extends BaseController {
  public start(req: Request, res: Response): void {
    try {
      const { scriptName } = req.body;

      if (!scriptName) {
        this.sessionManager.addFlashMessage(req, "danger", "No such script");
        res.sendStatus(404);
        return;
      }

      if (ServerRunner.currentRunner) {
        res.status(409).json({ error: "A runner is already active." });
        return;
      }

      const runner = ServerRunner.getRunner(scriptName);
      if (!runner) {
        res.status(400).json({ error: "No such runner" });
        return;
      }

      runner.start();

      res
        .status(200)
        .json({ message: `Runner started with script: ${scriptName}` });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public stop(req: Request, res: Response): void {
    try {
      const runner = ServerRunner.currentRunner;

      if (!runner) {
        res.status(404).json({ error: "No active runner to stop." });
        return;
      }

      runner.stop();
      res.status(200).json({ message: "Runner stopped successfully." });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public input(req: Request, res: Response): void {
    try {
      const { input } = req.body;

      if (!input) {
        res.status(400).json({ error: "Input is required." });
        return;
      }

      const runner = ServerRunner.currentRunner;

      if (!runner) {
        res.status(404).json({ error: "No active runner to send input to." });
        return;
      }

      runner.input(input);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
