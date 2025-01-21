export type ServerConfig = {
  id: string;
  title: string;
  type: "string" | "number" | "boolean" | "enum" | "json";
  options?: string[];
};

export type ServerConfigList = {
  identifier: string;
  config: ServerConfig[];
};
