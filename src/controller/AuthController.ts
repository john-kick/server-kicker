import { Request, Response } from "express";
import Button from "../components/Button";
import Container from "../components/Container";
import Form from "../components/Form";
import Input from "../components/Input";
import BaseController from "./BaseController";
import { json } from "stream/consumers";
import LoginForm from "../components/combinedComponents/LoginForm";

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
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: req.body.username,
          password: req.body.password
        })
      });

      const result = await response.json();

      if (!result.token) {
        const loginForm = new LoginForm("bla");
        res.send(this.wrapHTML([loginForm.render()]));
        return;
      }

      res.cookie("token", result.token);

      res.redirect("/dashboard");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public logout(_req: Request, res: Response) {
    res.clearCookie("token").redirect("/auth/login?logout=1");
  }
}
