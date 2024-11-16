export default abstract class BaseComponent {
  protected _attributeList: Record<string, string> = {};
  public get attributeList(): Record<string, string> {
    return this._attributeList;
  }

  protected _classList: string[] = [];
  public get classList(): string[] {
    return this._classList;
  }

  public abstract readonly tagName: string;
  protected readonly hasClosingTag = true;

  protected _innerHTML: string = "";
  public get innerHTML(): string {
    return this._innerHTML;
  }
  public set innerHTML(html: string) {
    this._innerHTML = html;
  }

  public setAttribute(key: string, value: string): this {
    this._attributeList[key] = value;
    return this;
  }

  public getAttribute(key: string): string {
    if (!this._attributeList.hasOwnProperty(key)) {
      return "";
    }
    return this._attributeList[key];
  }

  public render(): string {
    const attributes = this.attributesToString();
    let html = "<" + this.tagName + (attributes ? " " + attributes : "") + ">";
    if (this.hasClosingTag) {
      html += this._innerHTML;
      html += `</${this.tagName}>`;
    }
    return html;
  }

  protected attributesToString(): string {
    let str = "";

    Object.entries(this._attributeList).forEach(([key, value], index) => {
      str += ` ${key}="${value}"`;
    });

    return str;
  }
}
