import Anchor from "../elements/Anchor";
import Button from "../elements/Button";
import Container from "../elements/Container";
import Form from "../elements/Form";
import Header from "../elements/Header";
import Input from "../elements/Input";
import Paragraph from "../elements/Paragraph";
import BasePage, { PageParams } from "./Page";

interface LoginParams extends PageParams {
  loginError?: string;
}

export default class Login extends BasePage {
  protected path: string = "/auth/login";
  protected renderNavBar: boolean = false;

  constructor(protected params: LoginParams = {}) {
    super(params);
  }

  protected build(): void {
    // Example: Check if there's an error message in the params and show an alert
    if (this.params && this.params.loginError) {
      this.alertManager.addAlert(this.params.loginError, "danger", true, 5000); // Show error alert
    }

    const loginHeader = new Header(4);
    loginHeader.appendClasses("mb-3");
    loginHeader.innerText = "Login";

    const usernameInput = new Input();
    usernameInput.id = "username";
    usernameInput.type = "text";
    usernameInput.name = "username";
    usernameInput.placeholder = "Username";
    usernameInput.appendClasses("form-control");

    const usernameContainer = new Container();
    usernameContainer.appendClasses("mb-3");
    usernameContainer.appendComponents(usernameInput);

    const passwordInput = new Input();
    passwordInput.id = "password";
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.placeholder = "Password";
    passwordInput.appendClasses("form-control");

    const passwordContainer = new Container();
    passwordContainer.appendClasses("mb-3");
    passwordContainer.appendComponents(passwordInput);

    const submitButton = new Button("Login");
    submitButton.setAttribute("type", "submit");
    submitButton.appendClasses("mb-2");

    const registerAnchor = new Anchor();
    registerAnchor.href = "/auth/register";
    registerAnchor.innerText = "Register";

    const paragraph = new Paragraph();
    paragraph.appendClasses("mb-2");
    paragraph.appendComponents("Don't have an account yet? ", registerAnchor);

    const loginForm = new Form();
    loginForm.action = "/auth/login";
    loginForm.method = "POST";
    loginForm.appendClasses("auth-form", "p-3");
    loginForm.appendComponents(
      loginHeader,
      usernameContainer,
      passwordContainer,
      submitButton,
      paragraph
    );

    const loginContainer = new Container();
    loginContainer.setStyle("position", "absolute");
    loginContainer.setStyle("top", "50%");
    loginContainer.setStyle("left", "50%");
    loginContainer.setStyle("transform", "translate(-50%,-50%)");
    loginContainer.appendComponents(loginForm);

    this.components.push(loginContainer);
  }
}
