import Renderable, { RenderableList } from "../interface/Renderable";
import NavBar from "../elements/NavBar";
import config from "../util/config";

export default abstract class Page implements Renderable {
  protected abstract path: string;
  protected components: RenderableList = [];
  protected renderNavBar: boolean = true;

  constructor(public params: Record<string, any> = {}) {}

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

    return this.wrapHTML(html);
  }

  private wrapHTML(html: string): string {
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
				${html}
				<div style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);">
					<p>
						The website is still in development. If you find a bug or have feedback: <strong>I DO NOT CARE!</strong>
					</p>
					<p>
						Also: I use cookies. What are you gonna do about it?
					</p>
				</div>
			</body>`;
  }
}
