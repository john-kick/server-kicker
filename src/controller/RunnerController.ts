import { Request, Response } from "express";
import BaseController from "./BaseController";
import Runner from "../runner/Runner"; // Adjust import path as needed
import { AlertType } from "../component/Alert";

export default class RunnerController extends BaseController {
  public start(req: Request, res: Response): void {
    try {
      const { name, id } = req.body;

      if (!name) {
        this.redirectWithMessage(req, res, "A name must be provided.");
        return;
      }

      if (!id) {
        this.redirectWithMessage(req, res, "An id must be provided.");
      }

      if (Runner.currentRunner) {
        this.redirectWithMessage(
          req,
          res,
          "A runner is already active.",
          "warning"
        );
        return;
      }

      const runner = Runner.getRunner(name);
      if (!runner) {
        this.redirectWithMessage(req, res, "No such runner");
        return;
      }

      runner.start(id);

      this.redirectWithMessage(
        req,
        res,
        `Runner started with script: ${name}`,
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
      const runner = Runner.currentRunner;

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
