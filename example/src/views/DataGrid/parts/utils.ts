import { DataGrid } from 'juju-ui';

export function generateData(n, m) {
  let data = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < m; j++) {
      row.push(`${DataGrid.excelCol(j)}${i+1}`);
    }
    data.push(row);
  }
  return data;
}
