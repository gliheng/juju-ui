export type KeyFetcher = string | ((d: any) => string);

export type Datum = Record<string, any>;
export interface GroupDatum {
  groupName: string | number | boolean,
  groupPath: Array<string | number | boolean>,
  groupValue: string | number | boolean,
  groupChildren?: Array<GroupDatum | Datum>,
}

export interface ColumnConfig {
  key?: string; // for col size storage
  type?: 'selection' | 'index',
  label?: string, // table head
  cellKey?: KeyFetcher,
  field?: string, // a path specifier for it's data
  default?: any, // default value if data is not found on the record
  align?: string, // cell text alignment
  color?: string, // cell text color
  render?: (d: Datum, s?: any) => any, // custom render function for a cell
  class?: string | ((d: Datum) => string), // add a css class to cell
  width?: number,
  sticky?: string,
  children?: ColumnConfig[],
  resizable?: boolean,
}

export interface RowConfig {
  class?: string | ((d: Datum) => string), // add a css class to a row
}