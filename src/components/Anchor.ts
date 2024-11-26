import Component from "./Component";

export default class Anchor extends Component {
  public tagName: string = "a";

  public set href(h: string) {
    this._attributeList["href"] = h;
  }
}
