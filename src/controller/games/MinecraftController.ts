import { Request, Response } from "express";
import BaseController from "../BaseController";
import Minecraft from "../../pages/games/Minecraft";

export default class MinecraftController extends BaseController {
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
}
