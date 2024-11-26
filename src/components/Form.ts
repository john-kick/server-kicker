import Component, { HTMLMethod } from "./Component";

export default class Form extends Component {
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
