import type { DefaultNode } from "$lib/info/nodes";
import type { Node } from "@xyflow/svelte";

export type GroupData = {
  name: string;
  color?: string;
  ignoredRelations?: string[];
};

export type GroupNode = Node<GroupData, "customGroup">;

export const defaultGroupData = {
  name: "",
} as const satisfies GroupData;

export const defaultGroupNode = {
  type: "customGroup",
  data: defaultGroupData,
  zIndex: -5,
  width: 200,
  height: 120,
  extent: "parent",
} as const satisfies DefaultNode<GroupNode>;
