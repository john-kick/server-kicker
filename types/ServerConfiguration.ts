type Config<T> = {
  id: T;
  title: string;
  type: "string" | "number" | "boolean" | "enum" | "json";
  standard?: any;
  options?: string[];
  tooltip?: string;
};

export type ServerConfigList<T> = {
  identifier: string;
  config: Config<T>[];
};
