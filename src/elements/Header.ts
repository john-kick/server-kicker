import HTMLElement from "./HTMLElement";

export default class Header extends HTMLElement {
  public tagName: string = "h";

  public constructor(type: 1 | 2 | 3 | 4 | 5 | 6) {
    super();

    this.tagName = this.tagName + type;
  }
}
