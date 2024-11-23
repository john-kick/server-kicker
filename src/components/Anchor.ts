import BaseComponent from "./BaseComponent";

export default class Anchor extends BaseComponent {
  public tagName: string = "a";

  public set href(h: string) {
    this._attributeList["href"] = h;
  }
}
