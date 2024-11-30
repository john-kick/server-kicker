export default interface Renderable {
  render: () => string;
}

export type RenderableList = (Renderable | string)[];
