import Component from "./Component";

export default class Header extends Component {
  public tagName: string = "h";

  public constructor(type: 1 | 2 | 3 | 4 | 5 | 6) {
    super();

    this.tagName = this.tagName + type;
  }
}
