import HTMLElement, { HTTPMethod } from "./HTMLElement";
import Input, { InputType } from "./Input";
import Label from "./Label";

export default class Form extends HTMLElement {
  public tagName: string = "form";

  public set method(m: HTTPMethod) {
    this._attributeList["method"] = m;
  }

  public set action(a: string) {
    this._attributeList["action"] = a;
  }

  public set target(t: string) {
    this._attributeList["target"] = t;
  }

  public addFormField(
    name: string,
    type: InputType = "text",
    label?: string,
    placeholder?: string,
    value?: string,
    hidden?: boolean
  ) {
    const input = new Input(type);

    input.name = name;

    if (placeholder) {
      input.placeholder = placeholder;
    }

    if (value) {
      input.value = value;
    }

    input.setAttribute(
      "hidden",
      (hidden === true || type === "hidden").toString()
    );

    if (label) {
      const labelElement = new Label(input, label);
      this.appendComponents(labelElement);
    }

    this.appendComponents(input);
  }
}
