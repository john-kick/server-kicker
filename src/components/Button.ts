import BaseComponent from "./BaseComponent";

export default class Button extends BaseComponent {
  public readonly tagName: string = "button";

  public setType(type: string): this {
    this._attributeList["type"] = type;
    return this;
  }
}
