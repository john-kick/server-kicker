import { Request, Response } from "express";
import BaseController from "./BaseController";
import Dashboard from "../pages/Dashboard";

export default class DashboardController extends BaseController {
  public get(_req: Request, res: Response) {
    const dashboardPage = new Dashboard({});
    res.status(200).send(dashboardPage.render());
  }
}
