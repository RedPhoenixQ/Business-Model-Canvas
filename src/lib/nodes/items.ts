import { writable, type Writable } from "svelte/store";

export type ItemData = {
  name: string;
  icon?: string;
};

export const itemDetails: Writable<{ id: string; data: ItemData } | undefined> =
  writable();
