import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Container from "../components/Container";
import Form from "../components/Form";
import Header from "../components/Header";
import Input from "../components/Input";
import Paragraph from "../components/Paragraph";
import Span from "../components/Span";
import BasePage, { PageParams } from "./BasePage";

interface RegisterParams extends PageParams {
  message?: string;
}

export default class Register extends BasePage {
  protected path: string = "/auth/register";
  protected renderNavBar: boolean = false;

  protected build(params?: RegisterParams): void {
    const loginHeader = new Header(4);
    loginHeader.appendClasses("mb-3");
    loginHeader.innerText = "Register";

    const usernameInput = new Input();
    usernameInput.type = "text";
    usernameInput.name = "username";
    usernameInput.placeholder = "Username";
    usernameInput.appendClasses("form-control");

    const usernameContainer = new Container();
    usernameContainer.appendClasses("mb-3");
    usernameContainer.appendComponents(usernameInput);

    const passwordInput = new Input();
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.placeholder = "Password";
    passwordInput.appendClasses("form-control");

    const passwordContainer = new Container();
    passwordContainer.appendClasses("mb-3");
    passwordContainer.appendComponents(passwordInput);

    const passwordRepetitionInput = new Input();
    passwordRepetitionInput.type = "password";
    passwordRepetitionInput.name = "passwordRepetition";
    passwordRepetitionInput.placeholder = "Password repetition";
    passwordRepetitionInput.appendClasses("form-control");

    const passwordRepetitionContainer = new Container();
    passwordRepetitionContainer.appendClasses("mb-3");
    passwordRepetitionContainer.appendComponents(passwordRepetitionInput);

    const submitButton = new Button();
    submitButton.innerText = "Register";
    submitButton.type = "submit";
    submitButton.appendClasses("mb-2");

    const loginAnchor = new Anchor();
    loginAnchor.href = "/auth/login";
    loginAnchor.innerText = "Login";

    const paragraph = new Paragraph();
    paragraph.appendClasses("mb-2");
    paragraph.appendComponents("Already have an account? ", loginAnchor);

    const loginForm = new Form();
    loginForm.action = "/auth/register";
    loginForm.method = "POST";
    loginForm.appendClasses("auth-form", "p-3");
    loginForm.appendComponents(
      loginHeader,
      usernameContainer,
      passwordContainer,
      passwordRepetitionContainer,
      submitButton,
      paragraph
    );

    if (params && params.message) {
      const messageComponent = new Span();
      messageComponent.innerText = params.message;
      messageComponent.setStyle("color", "red");

      loginForm.appendComponents(messageComponent);
    }

    const loginContainer = new Container();
    loginContainer.setStyle("position", "absolute");
    loginContainer.setStyle("top", "50%");
    loginContainer.setStyle("left", "50%");
    loginContainer.setStyle("transform", "translate(-50%,-50%)");
    loginContainer.appendComponents(loginForm);

    this.components.push(loginContainer);
  }
}
