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
  private _bsType: BootstrapButtonType = "primary";
  public set bsType(t: BootstrapButtonType) {
    this._bsType = t;
  }

  private _bsOutline: boolean = false;
  public set bsOutline(o: boolean) {
    this._bsOutline = o;
  }

  private _bsSize: BootstrapButtonSize = "normal";
  public set bsSize(s: BootstrapButtonSize) {
    this._bsSize = s;
  }

  private _disabled: boolean = false;
  public set disabled(d: boolean) {
    this._disabled = d;
  }

  public set type(t: string) {
    this._attributeList["type"] = t;
  }

  private mapSizeToClassName(): string {
    switch (this._bsSize) {
      case "large":
        return "btn-lg";
      case "normal":
        return "";
      case "small":
        return "btn-sm";
      default:
        throw new Error(`Unknown button size ${this._bsSize}`);
    }
  }

  public preRender(): void {
    this._classList.push(
      "btn",
      "btn-" + (this._bsOutline ? "outline-" : "") + this._bsType
    );

    if (this._bsSize !== "normal") {
      const sizeClass = this.mapSizeToClassName();
      this._classList.push(sizeClass);
    }

    if (this._disabled) {
      this.attributeList.disabled = "";
    }
  }
}
