import { Request, Response } from "express";
import config from "../util/config";
import Login from "../pages/Login";
import BaseController from "./BaseController";

export default class AuthController extends BaseController {
  public get(req: Request, res: Response) {
    try {
      const sessionExpired = req.query.session_expired;
      const loginPage = new Login({
        message: sessionExpired
          ? "Your session has expired. Please log in again."
          : ""
      });
      res.send(loginPage.render());
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async post(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const response = await fetch(`${config.AUTH_SERVER_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        const loginPage = new Login({});
        res.send(loginPage.render());
        return;
      }

      res.cookie("token", result.token);
      res.cookie(
        "user",
        JSON.stringify({
          username: result.username,
          role: result.role,
          id: result.id
        })
      );

      res.redirect("/dashboard");
    } catch (error) {
      console.error;
      res.status(500).json(error);
    }
  }

  public logout(_req: Request, res: Response) {
    res.clearCookie("token").redirect("/auth/login");
  }
}
