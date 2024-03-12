import type { DefaultNode } from "$lib/info/nodes";

export type SegmentData = undefined;

export const defaultSegmentNode = {
  type: "segment",
  data: undefined,
  selectable: false,
  connectable: false,
  deletable: false,
  draggable: false,
  style: "pointer-events: none",
  zIndex: -10,
} as const satisfies DefaultNode<SegmentData, "segment">;
