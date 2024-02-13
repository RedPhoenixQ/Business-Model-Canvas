import { writable, type Writable } from "svelte/store";

export type Item = {
  name: string;
  icon?: string;
};

export const itemDetails: Writable<Writable<Item> | undefined> = writable();
