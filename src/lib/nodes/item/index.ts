import type { DefaultNode } from "$lib/info/nodes";

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

export const defaultItemData = {
  name: "",
  icon: {},
  description: "",
  showText: false,
  showTitle: false,
  textWidth: 120,
  textHeight: 40,
} as const satisfies ItemData;

export const defaultItemNode = {
  type: "item",
  data: defaultItemData,
  extent: "parent",
} as const satisfies DefaultNode;
