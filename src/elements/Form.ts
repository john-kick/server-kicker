import HTMLElement, { HTTPMethod } from "./HTMLElement";

export default class Form extends HTMLElement {
  public tagName: string = "form";

  public set method(m: HTTPMethod) {
    this._attributeList["method"] = m;
  }

  public set action(a: string) {
    this._attributeList["action"] = a;
  }

  public set target(t: string) {
    this._attributeList["target"] = t;
  }
}
