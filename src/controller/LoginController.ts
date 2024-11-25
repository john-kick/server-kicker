import { Request, Response } from "express";
import LoginForm from "../components/combinedComponents/LoginForm";
import BaseController from "./BaseController";
import RegisterForm from "../components/combinedComponents/RegisterForm";

export default class AuthController extends BaseController {
  public get(_req: Request, res: Response) {
    try {
      const loginForm = new LoginForm();

      res.send(this.wrapHTML([loginForm.render()], false));
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const response = await fetch("http://localhost:3002/auth/login", {
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
        const loginForm = new LoginForm(result.message);
        res.send(this.wrapHTML([loginForm.render()], false));
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
