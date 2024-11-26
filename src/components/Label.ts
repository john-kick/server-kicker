import Component from "./Component";
import Input from "./Input";

export default class Label extends Component {
  public tagName: string = "label";

  private _text: string;
  public get text(): string {
    return this._text;
  }
  public set text(t: string) {
    this._text = t;
  }

  private _for: Input;
  public get for(): Input {
    return this._for;
  }
  public set for(i: Input) {
    this._for = i;
  }

  public constructor(input: Input, text: string) {
    super();
    this._for = input;
    this._text = text;
  }
}
