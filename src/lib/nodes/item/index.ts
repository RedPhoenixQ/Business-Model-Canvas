import { writable, type Writable } from "svelte/store";

export type ItemIconInfo = {
  src?: string;
  background?: "dark" | "light";
  shape?: "square" | "circle";
};

export type ItemData = {
  name: string;
  icon: ItemIconInfo;
};

export const itemDetails: Writable<{ id: string; data: ItemData } | undefined> =
  writable();
