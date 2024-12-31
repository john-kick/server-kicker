import { Request } from "express";
import Card from "../component/Card";
import Header from "../elements/Header";
import Container from "../elements/Container";
import BasePage, { PageParams } from "./Page";

interface DashboardParams extends PageParams {
  login?: boolean; // If the user just logged in
}

export default class Dashboard extends BasePage {
  protected path: string = "/dashboard";

  constructor(req: Request, protected params: DashboardParams = {}) {
    super(req, params);
  }

  protected build(): void {
    // Title of the page
    const title = new Header(1);
    title.innerText = "Dashboard";

    if (this.params.login) {
      this.alertManager.addAlert("Login successful!", "success");
    }

    // Push the title into the components list
    this.components.push(title);

    // New section that will hold the data (spans full width)
    const dataSection = new Container();
    dataSection.appendClasses("container-fluid", "my-4"); // Dark background and light text

    // Example content for the data section
    const dataContent = `
      <div class="row justify-content-center">
            <div class="col-12 col-md-8">
                <h4>Currently Running Game Server</h4>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Server 1</h5>
                        <p class="card-text">This is the currently running server.</p>
                        <div class="alert alert-success" role="alert">
                            Status: <strong>Running</strong>
                        </div>
                        <p class="card-text">Details about Server 1: <br> - Game Mode: Survival <br> - Max Players: 100 <br> - Uptime: 3 hours 45 minutes</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Append the data content to the data section container
    dataSection.appendComponents(dataContent);

    // Push the data section to the components list
    this.components.push(dataSection);

    // Card container below the data section, centered horizontally
    const cardContainer = new Container();
    cardContainer.appendClasses(
      "d-flex", // Flex container
      "flex-wrap", // Allow wrapping of cards if necessary
      "gap-5", // Add gap between cards
      "p-3", // Padding
      "justify-content-center" // Center the cards horizontally
    );

    // Example card setup (you can add more cards dynamically as needed)
    const minecraftCard = new Card(
      "Minecraft",
      [],
      undefined,
      "/images/Minecraft.png",
      "/games/minecraft"
    );
    cardContainer.appendComponents(minecraftCard);

    // Push the card container to the components list
    this.components.push(cardContainer);
  }
}
