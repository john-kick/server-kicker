import { Request, Response } from "express";
import BaseController from "./BaseController";
import ServerRunner from "../runner/ServerRunner"; // Adjust import path as needed
import { AlertType } from "../component/Alert";

export default class RunnerController extends BaseController {
  public start(req: Request, res: Response): void {
    try {
      const { scriptName } = req.body;

      if (!scriptName) {
        this.redirectWithMessage(req, res, "A script name must be provided.");
        return;
      }

      if (ServerRunner.currentRunner) {
        this.redirectWithMessage(
          req,
          res,
          "A runner is already active.",
          "warning"
        );
        return;
      }

      const runner = ServerRunner.getRunner(scriptName);
      if (!runner) {
        this.redirectWithMessage(req, res, "No such runner");
        return;
      }

      runner.start();

      this.redirectWithMessage(
        req,
        res,
        `Runner started with script: ${scriptName}`,
        "success"
      );
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        this.redirectWithMessage(req, res, error.message);
      } else {
        this.redirectWithMessage(req, res, "An unknown error occurred");
      }
    }
  }

  public stop(req: Request, res: Response): void {
    try {
      const runner = ServerRunner.currentRunner;

      if (!runner) {
        this.redirectWithMessage(req, res, "No active runner to stop.", "info");
        return;
      }

      runner.stop();
      this.redirectWithMessage(
        req,
        res,
        "Runner stopped successfully.",
        "success"
      );
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        this.redirectWithMessage(req, res, error.message);
      } else {
        this.redirectWithMessage(req, res, "An unknown error occurred");
      }
    }
  }

  private redirectWithMessage(
    req: Request,
    res: Response,
    msg: string,
    type: AlertType = "danger"
  ) {
    this.sessionManager.addFlashMessage(req, type, msg);
    res.redirect("/dashboard");
  }
}
