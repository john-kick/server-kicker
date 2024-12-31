import { Request, Response } from "express";
import BaseController from "../BaseController";
import Minecraft from "../../pages/games/Minecraft";
import update from "../../util/minecraftVersionUpdater";

export default class MinecraftController extends BaseController {
  private updateInProgress = false;

  get(req: Request, res: Response) {
    try {
      const page = new Minecraft(req, res);
      res.send(page.render());
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.sessionManager.addFlashMessage(req, "danger", error.message);
      } else {
        this.sessionManager.addFlashMessage(
          req,
          "danger",
          "An unknown error occurred"
        );
      }

      // Redirect back to the dashboard
      res.redirect("/dashboard");
    }
  }

  updateMinecraftVersionData(req: Request, res: Response) {
    throw new Error("Test");
    if (this.updateInProgress) {
      this.addFlashMessage(
        req,
        "warning",
        "An update is already in progress. Please wait."
      );
    } else {
      this.updateInProgress = true;
      update().then(() => {
        this.updateInProgress = false;
      });
      this.addFlashMessage(req, "info", "Updating Minecraft version data...");
    }
    res.redirect("/games/minecraft");
  }
}
