import { Request, Response } from "express";
import BaseController from "./BaseController";
import Dashboard from "../pages/Dashboard";

export default class DashboardController extends BaseController {
  public get(req: Request, res: Response) {
    const dashboardPage = new Dashboard(req);
    res.status(200).send(dashboardPage.render());
  }
}
