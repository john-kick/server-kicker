import Renderable from "../interface/Renderable"; // Importing Renderable interface
import Button from "../elements/Button"; // Importing the Button component
import Container from "../elements/Container";

export type AlertType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

export default class Alert implements Renderable {
  private _type: AlertType = "info";
  private _message: string = "";
  private _dismissible: boolean = false;
  private _id: string = `alert-${Math.random().toString(36).substring(2, 9)}`;

  constructor(
    message: string,
    type: AlertType = "info",
    dismissible: boolean = false,
    duration: number | null = null
  ) {
    this._message = message;
    this._type = type;
    this._dismissible = dismissible;
  }

  // Setter for the message
  public set message(msg: string) {
    this._message = msg;
  }

  // Setter for alert type (success, error, info, warning)
  public set type(t: AlertType) {
    this._type = t;
  }

  // Setter for dismissible flag
  public set dismissible(d: boolean) {
    this._dismissible = d;
  }

  public render(): string {
    const alertWrapper = new Container();
    alertWrapper.appendClasses(
      "alert",
      `alert-${this._type}`,
      "position-fixed",
      this._dismissible ? "alert-dismissible" : "",
      "bottom-0",
      "end-0",
      "mb-3",
      "me-3"
    );
    alertWrapper.setAttribute("role", "alert");

    const contentWrapper = new Container();
    contentWrapper.innerText = this._message;

    alertWrapper.appendComponents(contentWrapper);

    if (this._dismissible) {
      const closeButton = new Button("");
      closeButton.setAttribute("type", "button");
      closeButton.appendClasses("btn-close");
      closeButton.type = "link";
      closeButton.setAttribute("data-bs-dismiss", "alert");
      closeButton.setAttribute("aria-label", "Close");
      contentWrapper.appendComponents(closeButton);
    }

    return alertWrapper.render();
  }
}
