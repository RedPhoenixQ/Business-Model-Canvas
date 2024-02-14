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

export const segmentInfo: Record<
  SegmentKey,
  { title: string; colorClass: string }
> = {
  customers: {
    title: "Customers",
    colorClass: "bg-lime-600",
  },
  "customer-relations": {
    title: "Customer Relations",
    colorClass: "bg-lime-700",
  },
  channels: {
    title: "Channels",
    colorClass: "bg-lime-700",
  },
  value: {
    title: "Value Proposition",
    colorClass: "bg-yellow-600",
  },
  "key-partners": {
    title: "Key Partners",
    colorClass: "bg-cyan-600",
  },
  "key-activities": {
    title: "Key activities",
    colorClass: "bg-cyan-700",
  },
  "key-resources": {
    title: "Key Resources",
    colorClass: "bg-cyan-700",
  },
  costs: {
    title: "Costs",
    colorClass: "bg-orange-500",
  },
  revenue: {
    title: "Revenue Streams",
    colorClass: "bg-orange-500",
  },
} as const;

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

export const defaultSegments: Node[] = [
  //  Key left side
  {
    id: "key-partners",
    position: { x: 0, y: 0 },
    width: SIZE,
    height: SIZE * 2,
    ...defaultSegment,
  },
  {
    id: "key-activities",
    position: { x: SIZE, y: 0 },
    width: SIZE,
    height: SIZE,
    ...defaultSegment,
  },
  {
    id: "key-resources",
    position: { x: SIZE, y: SIZE },
    width: SIZE,
    height: SIZE,
    ...defaultSegment,
  },
  // Value
  {
    id: "value",
    position: { x: SIZE * 2, y: 0 },
    width: SIZE,
    height: SIZE * 2,
    ...defaultSegment,
  },
  // Customers
  {
    id: "customer-relations",
    position: { x: SIZE * 3, y: SIZE },
    width: SIZE,
    height: SIZE,
    ...defaultSegment,
  },
  {
    id: "channels",
    position: { x: SIZE * 3, y: 0 },
    width: SIZE,
    height: SIZE,
    ...defaultSegment,
  },
  {
    id: "customers",
    position: { x: SIZE * 4, y: 0 },
    width: SIZE,
    height: SIZE * 2,
    ...defaultSegment,
  },
  // Money
  {
    id: "costs",
    position: { x: 0, y: SIZE * 2 },
    width: SIZE * 2.5,
    height: SIZE,
    ...defaultSegment,
  },
  {
    id: "revenue",
    position: { x: SIZE * 2.5, y: SIZE * 2 },
    width: SIZE * 2.5,
    height: SIZE,
    ...defaultSegment,
  },
] as const satisfies (Node<SegmentData, "segment"> & {
  id: SegmentKey;
})[];
