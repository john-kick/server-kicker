import Button from "../elements/Button";
import Form from "../elements/Form";
import Header from "../elements/Header";
import Input from "../elements/Input";
import Page, { PageParams } from "./Page";

interface TestParams extends PageParams {
  checked?: string;
}

export default class Test extends Page {
  protected path: string = "/test";

  constructor(protected params: TestParams = {}) {
    super(params);
  }

  protected build(): void {
    const header = new Header(1);
    header.innerText = "Test page";

    const form = new Form();

    form.action = "/test/";
    form.method = "POST";

    const checkbox = new Input("checkbox");
    checkbox.name = "checkbox";
    checkbox.setAttribute(
      "checked",
      (this.params.checked === "true").toString()
    );

    const button = new Button("Submit");
    button.setAttribute("type", "submit");

    form.appendComponents(checkbox, button);

    this.components.push(header, form);
  }
}
