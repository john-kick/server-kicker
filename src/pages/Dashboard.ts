import Dropdown from "../component/Accordion";
import Button from "../elements/Button";
import Header from "../elements/Header";
import BasePage from "./Page";

export default class Dashboard extends BasePage {
  protected build(): void {
    const title = new Header(1);
    title.innerText = "Dashboard";
    title.appendClasses("p-2");

    this.components.push(title);

    const dropdown = new Dropdown("test-dropdown", [new Button("Test")]);
    this.components.push(dropdown);
  }
  protected path: string = "/dashboard";
}
