import { Request, Response } from "express";
import BaseController from "./BaseController";
import Button from "../components/Button";

export default class AuthController extends BaseController {
  public get(req: Request, res: Response) {
    try {
      const btn = new Button();
      btn.setType("test");
      btn.innerHTML = "Test Button";
      btn.setAttribute("test", "test");

      res.send(btn.render());
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
