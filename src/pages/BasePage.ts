import Component, { ComponentList } from "../components/Component";
import NavBar from "../components/NavBar";

export interface PageParams {}

export default abstract class Page {
  protected abstract path: string;
  protected components: ComponentList = [];
  protected renderNavBar: boolean = true;

  protected abstract build(params?: PageParams): void;

  public render(params?: PageParams): string {
    this.build(params);

    let html = "";

    this.components.forEach((component: Component | string) => {
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
			<link rel="stylesheet" href="http://localhost:3000/styles.css">
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
