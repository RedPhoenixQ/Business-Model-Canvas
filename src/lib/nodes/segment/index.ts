import type { DefaultNode } from "$lib/info/nodes";
import type { Node } from "@xyflow/svelte";

export type SegmentData = Record<string, unknown>;

export type SegmentNode = Node<SegmentData, "segment">;

export const defaultSegmentData = {} as const satisfies SegmentData;

export const defaultSegmentNode = {
  type: "segment",
  data: defaultSegmentData,
  selectable: false,
  connectable: false,
  deletable: false,
  draggable: false,
  style: "pointer-events: none",
  zIndex: -10,
} as const satisfies DefaultNode<SegmentNode>;
