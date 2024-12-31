import { Request, Response } from "express";
import Register from "../pages/Register";
import BaseController from "./BaseController";
import config from "../util/config";
import {
  validateUsername,
  validatePassword,
  validatePasswordRepetition
} from "../util/validationUtils";

export default class RegisterController extends BaseController {
  public async get(req: Request, res: Response) {
    try {
      const registerPage = new Register(req, {});
      res.send(registerPage.render());
    } catch (error) {
      console.error("Error rendering register page:", error);
      this.addFlashMessage(
        req,
        "danger",
        "Failed to load the registration page."
      );
      res.redirect("/error");
    }
  }

  public async post(req: Request, res: Response) {
    try {
      const { username, password, passwordRepetition } = req.body;

      const msg =
        validateUsername(username) ||
        validatePassword(password) ||
        validatePasswordRepetition(password, passwordRepetition);

      if (msg) {
        const registerPage = new Register(req, { registerError: msg });
        res.send(registerPage.render());
        return;
      }

      const response = await fetch(`${config.AUTH_SERVER_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const result = await response.json();
        const registerPage = new Register(req, {
          registerError: result.message
        });
        res.send(registerPage.render());
        return;
      }

      const result = await response.json();
      res.cookie("token", result.token);
      res.cookie(
        "user",
        JSON.stringify({
          username: result.username,
          role: result.role,
          id: result.id
        })
      );

      this.addFlashMessage(req, "success", "Registration successful.");
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      this.addFlashMessage(
        req,
        "danger",
        "An unexpected error occurred. Please try again."
      );
      res.redirect("/auth/register");
    }
  }
}
