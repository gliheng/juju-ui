import { Component } from 'vue';

export type LibraryItem = {
  label: string,
  name: string,
  component: Component,
};

export type Library = Array<LibraryItem>;

export type Preset = any;
