import Header from "../elements/Header";
import BasePage from "./BasePage";

export default class Dashboard extends BasePage {
  protected build(): void {
    const title = new Header(1);
    title.innerText = "Dashboard";
    title.appendClasses("p-2");

    this.components.push(title);
  }
  protected path: string = "/dashboard";
}
