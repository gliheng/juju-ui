export function formatDate(date: Date | undefined): string {
  if (!date) return '';

  let t = date;
  let y = t.getFullYear();
  let m = t.getMonth() + 1;
  let d = t.getDate();
  return `${y}-${m}-${d}`;
}

export function toDate(s: string): Date | undefined {
  let match = /(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s);
  if (match) {
    let y = parseInt(match[1]);
    let m = parseInt(match[2]);
    let d = parseInt(match[3]);
    if (m <= 12 && m >= 1 && d <= 31 && d >= 1) {
      return new Date(y, m - 1, d);
    }
  }
}