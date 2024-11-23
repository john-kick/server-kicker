import { Request, Response } from "express";
import Button from "../components/Button";
import Container from "../components/Container";
import Form from "../components/Form";
import Input from "../components/Input";
import BaseController from "./BaseController";

export default class AuthController extends BaseController {
  public get(_req: Request, res: Response) {
    try {
      const usernameInput = new Input();
      usernameInput.id = "username";
      usernameInput.type = "text";
      usernameInput.placeholder = "Username";
      usernameInput.appendClasses("form-control");

      const usernameContainer = new Container();
      usernameContainer.appendClasses("mb-3");
      usernameContainer.appendComponents(usernameInput);

      const passwordInput = new Input();
      passwordInput.id = "password";
      passwordInput.type = "password";
      passwordInput.placeholder = "Password";
      passwordInput.appendClasses("form-control");

      const passwordContainer = new Container();
      passwordContainer.appendClasses("mb-3");
      passwordContainer.appendComponents(passwordInput);

      const submitButton = new Button();
      submitButton.innerText = "Login";
      submitButton.type = "submit";

      const loginForm = new Form();
      loginForm.action = "/auth/login";
      loginForm.method = "POST";
      loginForm.appendComponents(
        usernameContainer,
        passwordContainer,
        submitButton
      );

      const loginContainer = new Container();
      loginContainer.setStyle("position", "absolute");
      loginContainer.setStyle("top", "50%");
      loginContainer.setStyle("left", "50%");
      loginContainer.setStyle("transform", "translate(-50%,-50%)");
      loginContainer.appendComponents(loginForm);

      res.send(this.wrapHTML([loginContainer.render()], false));
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public logout(_req: Request, res: Response) {
    // Log out current user
  }
}
