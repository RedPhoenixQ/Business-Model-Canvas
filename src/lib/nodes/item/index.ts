import type { IconInfo } from "$lib/components/custom/icon";
import type { DefaultNode } from "$lib/info/nodes";

export type ItemData = IconInfo & {
  name: string;
  description: string;
  showTitle: boolean;
  showText: boolean;
  textWidth: number;
  textHeight: number;
  impactText?: string;
};

export const defaultItemData = {
  name: "",
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
