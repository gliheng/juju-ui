class Storage {
  constructor(private key: string) {}

  async save(name: string, data: any) {
    localStorage.setItem(`${this.key}::${name}`, JSON.stringify(data));
  }

  async read(name: string): Promise<any> {
    let s = localStorage.getItem(`${this.key}::${name}`);
    if (!s) return;
    try {
      return JSON.parse(s);
    } catch (e) {
      return;
    }
  }

  /**
   * Remove a group of keys beginning with certain prefix
   */
  clear() {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(`${this.key}::`)) {
        localStorage.removeItem(key);
      }
    }
  }
}

export function getStorage(key: string) {
  return new Storage(key);
}
