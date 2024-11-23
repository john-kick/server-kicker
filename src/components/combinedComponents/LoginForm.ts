import Button from "../Button";
import Container from "../Container";
import Form from "../Form";
import Input from "../Input";
import Span from "../Span";
import BaseCombinedComponent from "./BaseCombinedComponent";

export default class LoginForm extends BaseCombinedComponent {
  loginContainer: Container;

  public constructor(message?: string) {
    super();

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

    const loginForm = new Form();
    loginForm.action = "/auth/login";
    loginForm.method = "POST";
    loginForm.appendComponents(
      usernameContainer,
      passwordContainer,
      submitButton
    );

    if (message) {
      const messageComponent = new Span();
      messageComponent.innerText = message;
      messageComponent.setStyle("color", "red");

      const messageContainer = new Container();
      messageContainer.appendClasses("mb-3");
      messageContainer.appendComponents(messageComponent);

      loginForm.appendComponents(messageContainer);
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
