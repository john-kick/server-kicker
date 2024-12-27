import { Request } from "express";
import Container from "../elements/Container";
import NavBar from "../elements/NavBar";
import Paragraph from "../elements/Paragraph";
import Renderable, { RenderableList } from "../interface/Renderable";
import { AlertManager } from "../util/AlertManager";
import SessionManager from "../util/SessionManager";

export interface PageParams {}

export default abstract class Page implements Renderable {
  protected abstract path: string;
  protected components: RenderableList = [];
  protected renderNavBar: boolean = true;

  constructor(
    private req: Request,
    protected params: PageParams = {},
    private _alertManager: AlertManager = new AlertManager()
  ) {}

  public get alertManager(): AlertManager {
    return this._alertManager;
  }

  protected abstract build(): void;

  public render(): string {
    this.build();

    let html = "";

    this.components.forEach((component: Renderable | string) => {
      if (typeof component === "string") {
        html += component;
      } else {
        html += component.render();
      }
    });

    html += this.getDevelopmentMessage().render();

    const alertsContainer = new Container();
    alertsContainer.appendClasses(
      "alerts-container",
      "position-fixed",
      "bottom-0",
      "end-0",
      "mb-3",
      "me-3"
    );
    alertsContainer.appendComponents(this._alertManager.renderAlerts());

    // Get all flash messages and display them
    const sessionManager = SessionManager.getInstance();
    const flashMessages = sessionManager.getFlashMessages(this.req);

    flashMessages?.forEach((flashMessage) => {
      this.alertManager.addAlert(flashMessage.message, flashMessage.type);
    });

    alertsContainer.appendComponents(this.alertManager.renderAlerts());

    html += alertsContainer.render();

    return this.wrapHTML(html);
  }

  private wrapHTML(html: string): string {
    const contentWrapper = new Container();
    contentWrapper.id = "page-content";
    contentWrapper.appendClasses("m-3").appendComponents(html);

    return `
		<!DOCTYPE html>
			<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
			<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
			<link rel="stylesheet" href="/styles.css">
				<title>Server Kicker</title>
			</head>
			<body data-bs-theme="dark">
				${this.renderNavBar ? new NavBar().render() : ""}
				${contentWrapper.render()}
			</body>`;
  }

  private getDevelopmentMessage(): Container {
    const devMessage = new Paragraph();
    devMessage.innerText =
      "The website is still in development. If you find a bug or have feedback: <strong>I DO NOT CARE!</strong>";

    const cookieMessage = new Paragraph();
    cookieMessage.innerText =
      "Also: I use cookies. What are you gonna do about it?";

    const container = new Container();
    container.appendComponents(devMessage, cookieMessage);
    container.setStyle("position", "absolute");
    container.setStyle("bottom", "5px");
    container.setStyle("left", "50%");
    container.setStyle("transform", "translateX(-50%)");

    return container;
  }
}
