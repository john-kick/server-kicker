import { Request, Response } from "express";
import Register from "../pages/Register";
import BaseController from "./BaseController";
import config from "../util/config";

export default class RegisterController extends BaseController {
  public async get(_req: Request, res: Response) {
    try {
      const registerPage = new Register({});
      res.send(registerPage.render());
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  public async post(req: Request, res: Response) {
    try {
      const { username, password, passwordRepetition } = req.body;

      const msg = this.validate(username, password, passwordRepetition);

      if (msg) {
        const registerPage = new Register({ registerError: msg });
        res.send(registerPage.render());
        return;
      }

      const response = await fetch(`${config.AUTH_SERVER_URL}/register`, {
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

      if (!response.ok) {
        const registerPage = new Register({ registerError: result.message });
        res.send(registerPage.render());
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

  private validate(
    username: string,
    password: string,
    passwordRepetition: string
  ) {
    const msg =
      this.validateUsername(username) ||
      this.validatePassword(password) ||
      this.validatePasswordRepetition(password, passwordRepetition);
    if (msg) return msg;
  }

  private validateUsername(username: string): string | undefined {
    const usernameRules = new Map<RegExp, string>([
      [/^.+$/, "Username must not be empty"],
      [/^.{3,32}$/, "Username must be between 3 and 32 characters long"],
      [
        /^[a-zA-Z0-9._]+$/,
        'Username may only contain letters, numbers and special characters (".", "_")'
      ],
      [
        /^(?!.*[_.]{2})/,
        'Username may not contain consecutive dots (".") or underscores ("_")'
      ],
      [
        /^[^_.]/,
        'Username must not start with a dot (".") or underscore ("_")'
      ],
      [/[^_.]$/, 'Username must not end with a dot (".") or underscore ("_")']
    ]);

    for (const [regex, message] of usernameRules) {
      if (!regex.test(username)) {
        return message;
      }
    }

    return undefined;
  }

  private validatePassword(password: string): string | undefined {
    const passwordRules = new Map<RegExp, string>([
      [/^.+$/, "Password must not be empty"],
      [/.{8,64}/, "Password must be between 8 and 64 characters long"],
      [/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)"],
      [/[a-z]/, "Password must contain at least one lowercase letter (a-z)"],
      [/[0-9]/, "Password must contain at least one digit (0-9)"],
      [
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character (e.g., !@#$%^&*)"
      ],
      [/^\S*$/, "Password must not contain spaces"]
    ]);

    for (const [regex, message] of passwordRules) {
      if (!regex.test(password)) return message;
    }

    return undefined;
  }

  private validatePasswordRepetition(
    password: string,
    repeatedPassword: string
  ): string | undefined {
    if (!password) return "Password repetition must not be empty";
    if (password !== repeatedPassword) return "Passwords do not match";
    return undefined;
  }
}
