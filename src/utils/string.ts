export function pascalCase(s: string): string {
  return s.split('-').map(s => s[0].toUpperCase() + s.substring(1)).join('');
}

export function camelCase(s: string): string {
  return s.split('-').map((s, i) => {
    if (i == 0) {
      return s;
    }
    return s[0].toUpperCase() + s.substring(1);
  }).join('');
}