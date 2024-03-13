import type { DefaultNode } from "$lib/info/nodes";

export type GroupData = {
  name: string;
  color?: string;
};

export const defaultGroupNode = {
  type: "customGroup",
  data: {
    name: "",
  },
  zIndex: -5,
  width: 200,
  height: 120,
  selectable: false,
  extent: "parent",
} as const satisfies DefaultNode<GroupData, "customGroup">;
