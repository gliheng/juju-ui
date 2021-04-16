import { Component } from 'vue';

export type LibraryItem = {
  label: string,
  name: string,
  component: Component,
};

export type Library = Array<LibraryItem>;

export type PaneOptionalAttrs = Partial<{
  props: any,
  size: number,
  minSize: number,
  maxSize: number,
  flex: number,
}>;

export type PaneAttrs = {
  use: string,
  children?: PaneAttrs[],
} & PaneOptionalAttrs | string;

export type StrictPaneAttrs = {
  use: string,
  id: number,
  children?: StrictPaneAttrs[],
} & PaneOptionalAttrs;

export type RenderBox = {
  x: number,
  y: number,
  width: number,
  height: number,
  use: string,
  id: number,
  props?: any,
  layoutContext?: LayoutContext,
  parent?: RenderBox,
  children?: RenderBox[],
  layout: () => void,
  removeChild: (id: number) => boolean,
} & PaneOptionalAttrs;


export interface LayoutContext {
  flexSize: number,
}