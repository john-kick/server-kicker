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

export type APIServer<T> = {
  id: string;
  name: string;
  active: boolean;
  conifguration: T;
};
