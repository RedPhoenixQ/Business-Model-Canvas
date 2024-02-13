import type { Node } from "@xyflow/svelte";

export type SegmentKey =
  | "key-partners"
  | "key-activities"
  | "key-resources"
  | "value"
  | "customer-relations"
  | "channels"
  | "customers"
  | "costs"
  | "revenue";

export type SegmentData = {};

const SIZE = 200;

const defaultSegment: Omit<Node<SegmentData, "segment">, "id" | "position"> = {
  type: "segment",
  data: {},
  selectable: false,
  connectable: false,
  deletable: false,
  draggable: false,
  style: "pointer-events: none",
  zIndex: -10,
};

export const defaultSegments: Node<SegmentData, "segment">[] = [
  //  Key left side
  {
    id: "key-partners" as SegmentKey,
    position: { x: 0, y: 0 },
    width: SIZE,
    height: SIZE * 2,
    ...defaultSegment,
  },
  {
    id: "key-activities" as SegmentKey,
    position: { x: SIZE, y: 0 },
    width: SIZE,
    height: SIZE,
    ...defaultSegment,
  },
  {
    id: "key-resources" as SegmentKey,
    position: { x: SIZE, y: SIZE },
    width: SIZE,
    height: SIZE,
    ...defaultSegment,
  },
  // Value
  {
    id: "value" as SegmentKey,
    position: { x: SIZE * 2, y: 0 },
    width: SIZE,
    height: SIZE * 2,
    ...defaultSegment,
  },
  // Customers
  {
    id: "customer-relations" as SegmentKey,
    position: { x: SIZE * 3, y: SIZE },
    width: SIZE,
    height: SIZE,
    ...defaultSegment,
  },
  {
    id: "channels" as SegmentKey,
    position: { x: SIZE * 3, y: 0 },
    width: SIZE,
    height: SIZE,
    ...defaultSegment,
  },
  {
    id: "customers" as SegmentKey,
    position: { x: SIZE * 4, y: 0 },
    width: SIZE,
    height: SIZE * 2,
    ...defaultSegment,
  },
  // Money
  {
    id: "costs" as SegmentKey,
    position: { x: 0, y: SIZE * 2 },
    width: SIZE * 2.5,
    height: SIZE,
    ...defaultSegment,
  },
  {
    id: "revenue" as SegmentKey,
    position: { x: SIZE * 2.5, y: SIZE * 2 },
    width: SIZE * 2.5,
    height: SIZE,
    ...defaultSegment,
  },
] as const;
