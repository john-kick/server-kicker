import HTMLElement from "./HTMLElement";
import Label from "./Label";

type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export default class Input extends HTMLElement {
  public readonly tagName: string = "input";

  private _type: InputType = "text";
  public set type(t: InputType) {
    this._type = t;
  }

  private _placeholder: string = "";
  public set placeholder(p: string) {
    this._placeholder = p;
  }

  public set name(n: string) {
    this._attributeList.name = n;
  }

  public preRender(): void {
    this._attributeList.type = this._type;
    this._attributeList.placeholder = this._placeholder;
  }
}
