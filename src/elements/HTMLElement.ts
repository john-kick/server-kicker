import Renderable, { RenderableList } from "../interface/Renderable";

export type HTTPMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export default abstract class HTMLElement implements Renderable {
  protected _id: string = "";
  public set id(id: string) {
    this._id = id;
  }

  protected _attributeList: Record<string, string> = {};
  public get attributeList(): Record<string, string> {
    return this._attributeList;
  }

  protected _classList: string[] = [];
  public get classList(): string[] {
    return this._classList;
  }
  public appendClasses(...c: string[]) {
    this._classList = this._classList.concat(c);
  }

  protected _styleList: Record<string, string> = {};
  public setStyle(k: string, v: string) {
    this._styleList[k] = v;
  }

  public abstract readonly tagName: string;
  protected readonly hasClosingTag = true;

  protected _innerComponents: RenderableList = [];

  public appendComponents(...c: RenderableList) {
    this._innerComponents = this._innerComponents.concat(c);
  }

  private _innerText: string = "";
  public set innerText(i: string) {
    this._innerText = i;
  }

  private _extraJs: string = "";
  public set extraJs(e: string) {
    this._extraJs = e;
  }

  public setAttribute(key: string, value: string): this {
    this._attributeList[key] = value;
    return this;
  }

  public getAttribute(key: string): string {
    if (!this._attributeList.hasOwnProperty(key)) {
      return "";
    }
    return this._attributeList[key];
  }

  public preRender(): void {
    //noop
  }

  public render(): string {
    this.preRender();
    if (this._id) {
      this._attributeList.id = this._id;
    }

    // Append classes to the attributes
    this._attributeList.class = this._classList.join(" ");

    // Append styles to the attributes
    let styles = "";
    Object.entries(this._styleList).forEach(([key, value]) => {
      styles += `${key}:${value};`;
    });
    this._attributeList.style = styles;

    const attributes = this.attributesToString();
    let html = "<" + this.tagName + (attributes ? " " + attributes : "") + ">";
    if (this.hasClosingTag) {
      this._innerComponents.forEach((component) => {
        if (typeof component === "string") {
          html += component;
        } else {
          html += component.render();
        }
      });
      html += this._innerText;
      html += `</${this.tagName}>`;
    }

    if (this._extraJs) {
      html += `<script>${this._extraJs}</script>`;
    }

    return html;
  }

  protected attributesToString(): string {
    let str = "";

    Object.entries(this._attributeList).forEach(([key, value], index) => {
      str += ` ${key}="${value}"`;
    });

    return str;
  }
}
