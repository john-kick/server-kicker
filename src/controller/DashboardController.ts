import { Request, Response } from "express";
import BaseController from "./BaseController";

export default class DashboardController extends BaseController {
  public get(_req: Request, res: Response) {
    res.status(200).send(this.wrapHTML(["Alive"]));
  }
}
