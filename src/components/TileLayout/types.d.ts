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
}[];

export type Layout = {
  use: string;
  x: number;
  y: number;
  w: number;
  h: number;
}[];
