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

export function isSameDay(year: number, month: number, date: number, d?: Date): boolean {
  if (!d) return false;
  return year == d.getFullYear() && month == d.getMonth() && date == d.getDate();
}

export function isBetween(year: number, month: number, date: number, start?: Date, end?: Date): boolean {
  if (!start || !end) {
    return false;
  }

  let t = new Date(year, month, date).getTime();
  let t0 = start.getTime(), t1 = end.getTime();
  return t0 < t && t < t1;
}