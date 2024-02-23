import type { Node } from "@xyflow/svelte";
import { writable, type Writable } from "svelte/store";

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

export type Grid = {
  columns: number[];
  rows: number[];
};

const SIZE = 200;

export const segmentInfo: Record<
  SegmentKey,
  {
    title: string;
    colorClass: string;
    grid: {
      column: {
        start: number;
        end: number;
      };
      row: {
        start: number;
        end: number;
      };
    };
    size: {
      width: number;
      height: number;
    };
  }
> = {
  "key-partners": {
    title: "Key Partners",
    colorClass: "bg-cyan-600",
    grid: {
      column: {
        start: 0,
        end: 1,
      },
      row: {
        start: 1,
        end: 3,
      },
    },
    size: {
      width: SIZE,
      height: SIZE * 2,
    },
  },
  "key-activities": {
    title: "Key activities",
    colorClass: "bg-cyan-700",
    grid: {
      column: {
        start: 1,
        end: 2,
      },
      row: {
        start: 2,
        end: 3,
      },
    },
    size: {
      width: SIZE,
      height: SIZE,
    },
  },
  "key-resources": {
    title: "Key Resources",
    colorClass: "bg-cyan-700",
    grid: {
      column: {
        start: 1,
        end: 2,
      },
      row: {
        start: 1,
        end: 2,
      },
    },
    size: {
      width: SIZE,
      height: SIZE,
    },
  },
  value: {
    title: "Value Proposition",
    colorClass: "bg-yellow-600",
    grid: {
      column: {
        start: 2,
        end: 4,
      },
      row: {
        start: 1,
        end: 3,
      },
    },
    size: {
      width: SIZE,
      height: SIZE * 2,
    },
  },
  "customer-relations": {
    title: "Customer Relations",
    colorClass: "bg-lime-700",
    grid: {
      column: {
        start: 4,
        end: 5,
      },
      row: {
        start: 2,
        end: 3,
      },
    },
    size: {
      width: SIZE,
      height: SIZE,
    },
  },
  channels: {
    title: "Channels",
    colorClass: "bg-lime-700",
    grid: {
      column: {
        start: 4,
        end: 5,
      },
      row: {
        start: 1,
        end: 2,
      },
    },
    size: {
      width: SIZE,
      height: SIZE,
    },
  },
  customers: {
    title: "Customers",
    colorClass: "bg-lime-600",
    grid: {
      column: {
        start: 5,
        end: 6,
      },
      row: {
        start: 1,
        end: 3,
      },
    },
    size: {
      width: SIZE,
      height: SIZE * 2,
    },
  },
  costs: {
    title: "Costs",
    colorClass: "bg-orange-500",
    grid: {
      column: {
        start: 0,
        end: 3,
      },
      row: {
        start: 0,
        end: 1,
      },
    },
    size: {
      width: SIZE * 2.5,
      height: SIZE,
    },
  },
  revenue: {
    title: "Revenue Streams",
    colorClass: "bg-orange-500",
    grid: {
      column: {
        start: 3,
        end: 6,
      },
      row: {
        start: 0,
        end: 1,
      },
    },
    size: {
      width: SIZE * 2.5,
      height: SIZE,
    },
  },
} as const;

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
    ...defaultSegment,
  },
] as const satisfies (Node<SegmentData, "segment"> & {
  id: SegmentKey;
})[];

export const defaultGridSize = {
  columns: [SIZE, SIZE, SIZE / 2, SIZE / 2, SIZE, SIZE],
  rows: [SIZE, SIZE, SIZE],
};

export const gridSize: Writable<Grid> = writable(defaultGridSize);
gridSize.subscribe((val) => console.debug("gridSize", val));
