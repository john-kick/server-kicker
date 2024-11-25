import Anchor from "../Anchor";
import Button from "../Button";
import Container from "../Container";
import Form from "../Form";
import Header from "../Header";
import Input from "../Input";
import Paragraph from "../Paragraph";
import Span from "../Span";
import BaseCombinedComponent from "./BaseCombinedComponent";

export default class LoginForm extends BaseCombinedComponent {
  loginContainer: Container;

  public constructor(message?: string) {
    super();

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

    const submitButton = new Button();
    submitButton.innerText = "Login";
    submitButton.type = "submit";
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

    if (message) {
      const messageComponent = new Span();
      messageComponent.innerText = message;
      messageComponent.setStyle("color", "red");

      loginForm.appendComponents(messageComponent);
    }

    this.loginContainer = new Container();
    this.loginContainer.setStyle("position", "absolute");
    this.loginContainer.setStyle("top", "50%");
    this.loginContainer.setStyle("left", "50%");
    this.loginContainer.setStyle("transform", "translate(-50%,-50%)");
    this.loginContainer.appendComponents(loginForm);
  }

  public render() {
    return this.loginContainer.render();
  }
}
