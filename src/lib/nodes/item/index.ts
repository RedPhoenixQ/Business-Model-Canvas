import { writable } from "svelte/store";

export type ItemIconInfo = {
  src?: string;
  background?: "dark" | "light";
  shape?: "square" | "circle";
};

export type ItemData = {
  name: string;
  icon: ItemIconInfo;
  description: string;
  showTitle: boolean;
  showText: boolean;
  textWidth: number;
  textHeight: number;
};

export const showItemNames = writable(false);
