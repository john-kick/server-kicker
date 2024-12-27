import { Request } from "express";
import Dropdown from "../component/Accordion";
import Button from "../elements/Button";
import Form from "../elements/Form";
import Header from "../elements/Header";
import BasePage, { PageParams } from "./Page";

interface DashboardParams extends PageParams {
  login?: boolean; // If the user just logged in
}

export default class Dashboard extends BasePage {
  constructor(req: Request, protected params: DashboardParams = {}) {
    super(req, params);
  }

  protected build(): void {
    const title = new Header(1);
    title.innerText = "Dashboard";
    title.appendClasses("p-2");

    if (this.params.login) {
      this.alertManager.addAlert("Login successful!", "success");
    }

    this.components.push(title);

    const form = new Form();
    form.method = "POST";

    const startButton = new Button("Start")
      .appendClasses("me-3")
      .setAttribute("formaction", "/runner/start");

    const stopButton = new Button("Stop")
      .appendClasses("me-3")
      .setAttribute("formaction", "/runner/stop");

    form.appendComponents(startButton, stopButton);

    const dropdown = new Dropdown("Test", [form]);

    this.components.push(dropdown);
  }
  protected path: string = "/dashboard";
}
