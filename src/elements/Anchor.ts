import HTMLElement from "./HTMLElement";

export default class Anchor extends HTMLElement {
  public tagName: string = "a";

  public set href(h: string) {
    this._attributeList["href"] = h;
  }
}
