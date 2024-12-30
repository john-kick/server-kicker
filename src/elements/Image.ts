import HTMLElement from "./HTMLElement";

export default class Image extends HTMLElement {
  public readonly tagName: string = "img";

  constructor(src: string, alt: string = "") {
    super();
    this.setAttribute("src", src);
    this.setAttribute("alt", alt);
  }

  public set src(src: string) {
    this.setAttribute("src", src);
  }

  public set alt(alt: string) {
    this.setAttribute("alt", alt);
  }

  public preRender(): void {
    this.appendClasses(...this._classList);
  }
}
