let config = {
  popupBaseDepth: 1000,
};

export interface Config {
  popupBaseDepth?: number,
}

export function set(c: Config) {
  Object.assign(config, c);
}

export function get(): typeof config {
  return config;
}