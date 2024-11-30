import Container from "../elements/Container";
import Renderable, { RenderableList } from "../interface/Renderable";

export default class Accordion implements Renderable {
  private _title: string = "";
  private _content: RenderableList = [];
  private _id: string = "";

  constructor(title: string, content: RenderableList, id?: string) {
    this._title = title;
    this._content = content;
    if (id) {
      this._id = id;
    } else {
      // Generate a unique ID if none is provided
      this._id = `accordion-${Math.random().toString(36).substring(2, 9)}`;
    }
  }

  public set title(title: string) {
    this._title = title;
  }

  public set content(content: RenderableList) {
    this._content = content;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  public render(): string {
    // Accordion header
    const headerHtml = `
      <h2 class="accordion-header" id="${this._id}-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${this._id}-content" aria-expanded="false" aria-controls="${this._id}-content">
          ${this._title}
        </button>
      </h2>
    `;

    // Accordion content
    const contentHtml = this._content
      .map((item) => (typeof item === "string" ? item : item.render()))
      .join("");

    const bodyHtml = `
      <div id="${this._id}-content" class="accordion-collapse collapse" aria-labelledby="${this._id}-header">
        <div class="accordion-body">
          ${contentHtml}
        </div>
      </div>
    `;

    // Accordion container
    const accordionContainer = new Container();
    accordionContainer.appendClasses("accordion-item", "m-2");
    accordionContainer.appendComponents(headerHtml, bodyHtml);

    // Wrap the accordion item in a parent accordion
    const wrapper = new Container();
    wrapper.appendClasses("accordion");
    wrapper.appendComponents(accordionContainer);

    return wrapper.render();
  }
}
