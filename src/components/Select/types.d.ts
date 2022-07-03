export type OptionValue = string | number | boolean;

export interface Option {
  label: string,
  value: OptionValue,
  icon?: string,
  onClick?: () => void,
}
