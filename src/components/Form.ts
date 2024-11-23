import BaseComponent, { HTMLMethod } from "./BaseComponent";

export default class Form extends BaseComponent {
  public tagName: string = "form";

  public set method(m: HTMLMethod) {
    this._attributeList["method"] = m;
  }

  public set action(a: string) {
    this._attributeList["action"] = a;
  }

  public set target(t: string) {
    this._attributeList["target"] = t;
  }
}
