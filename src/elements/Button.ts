import HTMLElement from "./HTMLElement";

type BootstrapButtonType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

type BootstrapButtonSize = "normal" | "large" | "small";

export default class Button extends HTMLElement {
  public readonly tagName: string = "button";
  public set text(t: string) {
    this._text = t;
  }

  public set type(t: BootstrapButtonType) {
    this._type = t;
  }

  public set size(s: BootstrapButtonSize) {
    this._size = s;
  }

  public set outline(o: boolean) {
    this._outline = o;
  }

  public set disabled(d: boolean) {
    this._disabled = d;
  }

  constructor(
    private _text: string,
    private _type: BootstrapButtonType = "primary",
    private _size: BootstrapButtonSize = "normal",
    private _outline: boolean = false,
    private _disabled: boolean = false
  ) {
    super();
  }

  private mapSizeToClassName(): string {
    switch (this._size) {
      case "large":
        return "btn-lg";
      case "normal":
        return "";
      case "small":
        return "btn-sm";
      default:
        throw new Error(`Unknown button size ${this._size}`);
    }
  }

  public preRender(): void {
    this.appendComponents(this._text);
    this._classList.push(
      "btn",
      "btn-" + (this._outline ? "outline-" : "") + this._type
    );

    if (this._size !== "normal") {
      const sizeClass = this.mapSizeToClassName();
      this._classList.push(sizeClass);
    }

    if (this._disabled) {
      this.attributeList.disabled = "";
    }
  }
}
