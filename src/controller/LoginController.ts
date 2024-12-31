import { Request, Response } from "express";
import config from "../util/config";
import Login from "../pages/Login";
import BaseController from "./BaseController";
import { jwtDecode } from "jwt-decode";

interface TokenData {
  username: string;
  role: "unverified" | "verified" | "admin";
  id: number;
  iat: number;
  exp: number;
}

export default class AuthController extends BaseController {
  public get(req: Request, res: Response) {
    try {
      const sessionExpired = req.query.session_expired;
      const loginPage = new Login(req, {
        loginError: sessionExpired
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

      const response = await fetch(`${config.AUTH_SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const loginPage = new Login(req, {
          loginError: "Invalid credentials."
        });
        res.status(401).send(loginPage.render());
        return;
      }

      const { token } = await response.json();
      let tokenData: TokenData;
      try {
        tokenData = jwtDecode(token) as TokenData;
      } catch (error) {
        console.error("Invalid token:", error);
        res.status(401).send("Invalid token received.");
        return;
      }

      res.cookie("token", token);
      this.sessionManager.addFlashMessage(
        req,
        "success",
        "Logged in successfully."
      );
      this.sessionManager.addFlashMessage(
        req,
        "info",
        `Welcome, ${tokenData.username}!`
      );
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .send("An error occurred during login. Please try again later.");
    }
  }

  public logout(req: Request, res: Response) {
    this.sessionManager.clear(req);
    res.clearCookie("token").redirect("/auth/login?logout=1");
  }
}
