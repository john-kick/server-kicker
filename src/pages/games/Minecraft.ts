import Header from "../../elements/Header";
import Page from "../Page";

export default class Minecraft extends Page {
  protected path: string = "/games/minecraft";
  protected build(): void {
    const title = new Header(1);
    title.innerText = "Minecraft";

    this.components.push(title);
  }
}
