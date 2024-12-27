import { Request, Response } from "express";
import Test from "../pages/Test";
import BaseController from "./BaseController";

export default class TestController extends BaseController {
  get(req: Request, res: Response): void {
    const checked = this.sessionManager.get<string>(req, "checked");
    const page = new Test(req, { checked });
    res.send(page.render());
  }
}
