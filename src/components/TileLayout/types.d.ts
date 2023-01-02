import { Component } from 'vue';

export type LibraryItem = {
  label: string,
  name: string,
  component: Component,
};

export type Library = Array<LibraryItem>;

export type Preset = {
  use: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  static?: boolean;
  closable?: boolean;
}[];

export type Layout = Pane[];

export type Pane = {
  use: string;
  closable?: boolean;
} & Box;

export interface Box {
  static?: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}
