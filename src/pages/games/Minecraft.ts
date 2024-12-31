import Anchor from "../../elements/Anchor";
import Button from "../../elements/Button";
import Form from "../../elements/Form";
import Header from "../../elements/Header";
import update from "../../util/minecraftVersionUpdater";
import Page from "../Page";

export default class Minecraft extends Page {
  protected path: string = "/games/minecraft";
  protected build(): void {
    const title = new Header(1);
    title.innerText = "Minecraft";

    this.components.push(title);

    const button = new Button("Update Minecraft version data");
    const form = new Form();
    form.action = "/games/minecraft/updateVersionData";
    form.method = "POST";
    form.appendComponents(button);

    this.components.push(form);
  }
}
