import Container from "../elements/Container";
import Renderable, { RenderableList } from "../interface/Renderable";
import Image from "../elements/Image";
import Header from "../elements/Header";
import Anchor from "../elements/Anchor";

export default class Card implements Renderable {
  private _title: string | null = null;
  private _body: RenderableList = [];
  private _footer: string | null = null;
  private _image: string | null = null;
  private _classList: string[] = [];
  private _link: string | null = null; // New property for the link

  constructor(
    title?: string,
    body?: RenderableList,
    footer?: string,
    image?: string,
    link?: string // Optional link parameter
  ) {
    if (title) this._title = title;
    if (body) this._body = body;
    if (footer) this._footer = footer;
    if (image) this._image = image;
    if (link) this._link = link; // Set the link if provided
  }

  public set title(title: string | null) {
    this._title = title;
  }

  public set body(body: RenderableList) {
    this._body = body;
  }

  public set footer(footer: string | null) {
    this._footer = footer;
  }

  public set image(image: string | null) {
    this._image = image;
  }

  public set link(link: string | null) {
    // Setter for the link
    this._link = link;
  }

  public addClass(className: string): void {
    this._classList.push(className);
  }

  public render(): string {
    const card = new Container();
    card.appendClasses("card", ...this._classList);

    const cardBody = new Container();
    cardBody.appendClasses("card-body").appendComponents(...this._body);

    if (this._image) {
      const image = new Image(this._image, this._title || "Card image");
      image.appendClasses("card-img-top");
      card.appendComponents(image);
    }

    if (this._title) {
      const title = new Header(5);
      title.innerText = this._title;
      title.appendClasses("card-title");

      cardBody.appendComponents(title);
    }

    if (this._body) {
      cardBody.appendComponents(...this._body);
    }

    card.appendComponents(cardBody);

    if (this._footer) {
      const footer = new Container();
      footer.appendClasses("card-footer").appendComponents(...this._footer);

      card.appendComponents(footer);
    }

    const link = new Anchor();
    link.href = this._link || "#";
    link.appendClasses("card-link-wrapper").appendComponents(card);

    return link.render();
  }
}
