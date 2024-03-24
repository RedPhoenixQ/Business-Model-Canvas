import type { DefaultNode } from "$lib/info/nodes";

export type GroupData = {
  name: string;
  color?: string;
  ignoredRelations?: string[];
};

export const defaultGroupNode = {
  type: "customGroup",
  data: {
    name: "",
  },
  zIndex: -5,
  width: 200,
  height: 120,
  extent: "parent",
} as const satisfies DefaultNode;
