import type { DefaultNode } from "$lib/info/nodes";

export type GroupData = {
  title: string;
  color?: string;
};

export const defaultGroupNode = {
  type: "customGroup",
  data: {
    title: "",
  },
  zIndex: -5,
  width: 60,
  height: 60,
  extent: "parent",
} as const satisfies DefaultNode<GroupData, "customGroup">;