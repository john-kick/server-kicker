import { Request, Response } from "express";
import BaseController from "./BaseController";
import Dashboard from "../pages/Dashboard";

export default class DashboardController extends BaseController {
  public get(req: Request, res: Response) {
    try {
      const dashboardPage = new Dashboard(req);
      res.status(200).send(dashboardPage.render());
    } catch (error) {
      console.error("Error rendering Dashboard:", error);
      res.status(500).send("An error occurred while loading the dashboard.");
    }
  }
}
