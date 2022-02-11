export interface Config {
  popupBaseDepth: number;
  theme: string;
};

let config: Config = {
  popupBaseDepth: 1000,
  theme: "default",
};

export function set(c: Partial<Config>) {
  Object.assign(config, c);
}

export function get(): Config {
  return config;
}