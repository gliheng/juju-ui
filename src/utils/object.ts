export function getField(data: any, field?: string) {
  if (!field) return;
  let segs = field.split('.');
  segs.reverse();
  let seg;
  while (seg = segs.pop()) {
    if (data === undefined) return;
    if (Array.isArray(data)) {
      data = parseInt(seg);
    } else if (data && typeof data == 'object') {
      data = data[seg];
    } else {
      throw `Cannot read field: ${field}`;
    }
  }
  return data;
}

export function setField() {

}