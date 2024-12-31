import Card from "../../component/Card";
import Button from "../../elements/Button";
import Container from "../../elements/Container";
import Form from "../../elements/Form";
import Header from "../../elements/Header";
import Page from "../Page";

export default class Minecraft extends Page {
  protected path: string = "/games/minecraft";
  protected build(): void {
    const title = new Header(1);
    title.innerText = "Minecraft";

    this.components.push(title);

    const updateVersionsButton = new Button("Update Minecraft version data");
    const form = new Form();
    form.action = "/games/minecraft/updateVersionData";
    form.method = "POST";
    form.appendComponents(updateVersionsButton);

    this.components.push(form);

    const cardContainer = new Container();
    cardContainer.appendClasses(
      "d-flex", // Flex container
      "flex-wrap", // Allow wrapping of cards if necessary
      "gap-5", // Add gap between cards
      "p-3", // Padding
      "justify-content-center" // Center the cards horizontally
    );

    const serverCard = new Card(
      "My server",
      undefined,
      undefined,
      "/images/Minecraft.png"
    );

    cardContainer.appendComponents(serverCard);
    this.components.push(cardContainer);
  }
}
