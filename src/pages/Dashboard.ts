import Dropdown from "../component/Accordion";
import Button from "../elements/Button";
import Container from "../elements/Container";
import Form from "../elements/Form";
import Header from "../elements/Header";
import Input from "../elements/Input";
import BasePage from "./Page";

export default class Dashboard extends BasePage {
  protected build(): void {
    const title = new Header(1);
    title.innerText = "Dashboard";
    title.appendClasses("p-2");

    this.components.push(title);

    const form = new Form();

    form.appendComponents(new Input(), new Button("Send"));

    const dropdown = new Dropdown("Test", [
      new Button("Start"),
      new Button("Stop"),
      form
    ]);
    this.components.push(dropdown);
  }
  protected path: string = "/dashboard";
}
