export function getScreenSizeClass(w: number, h: number): string {
  if (w <= 768) {
    return 'sm';
  } if (w >= 1024) {
    return 'lg';
  }
  return 'md';
}