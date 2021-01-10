export interface Config {
  popupBaseDepth: number,
};

let config: Config = {
  popupBaseDepth: 1000,
};

export function set(c: Partial<Config>) {
  Object.assign(config, c);
}

export function get(): Config {
  return config;
}