export interface Config {
  popupBaseDepth: number; // popup minimum layer depth
  theme: string; // Default theme to use
  icons?: Record<string, string>; // Extra icon library
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