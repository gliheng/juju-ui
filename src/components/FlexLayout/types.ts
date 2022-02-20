import { Component } from 'vue';

export type LibraryItem = {
  label: string,
  name: string,
  component: Component,
};

export type Library = Array<LibraryItem>;

export type PaneOptionalAttrs = Partial<{
  props: any, // This props is passed to inner component
  size: number,
  minSize: number,
  maxSize: number,
  flex: number,
}>;

export type PaneAttrs = {
  use: string,
  children?: PaneAttrs[],
} & PaneOptionalAttrs | string;

export type NormalizedPaneAttrs = {
  use: string,
  children?: NormalizedPaneAttrs[],
} & PaneOptionalAttrs;

export interface LayoutContext {
  flexSize: number,
  totalFlex: number;
}

export interface Dimension {
  x: number;
  y: number;
  width: number;
  height: number;
}
