import { Request, Response } from "express";
import Input from "../components/Input";
import BaseController from "./BaseController";
import Form from "../components/Form";
import Button from "../components/Button";

export default class AuthController extends BaseController {
  public get(_req: Request, res: Response) {
    try {
      const usernameInput = new Input();
      usernameInput.id = "username";
      usernameInput.type = "text";
      usernameInput.placeholder = "Username";

      const passwordInput = new Input();
      passwordInput.id = "password";
      passwordInput.type = "password";
      passwordInput.placeholder = "Password";

      const submitButton = new Button();
      submitButton.innerText = "Login";
      submitButton.type = "submit";

      const loginForm = new Form();
      loginForm.action = "/auth/login";
      loginForm.method = "POST";
      loginForm.appendComponents(usernameInput, passwordInput, submitButton);

      res.send(this.wrapHTML([loginForm.render()], false));
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public logout(_req: Request, res: Response) {
    // Log out current user
  }
}
