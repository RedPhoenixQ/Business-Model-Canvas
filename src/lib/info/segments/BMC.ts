import { defaultItemData, defaultItemNode } from "$lib/nodes/item";
import type { SegmentsTemplate } from ".";

type BMCSegments =
  | "customer-relations"
  | "channels"
  | "customers"
  | "costs"
  | "revenue"
  | "key-partners"
  | "key-activities"
  | "key-resources"
  | "value";

export const BMCTemplate = {
  grid: {
    columns: [200, 200, 100, 100, 200, 200],
    rows: [200, 200, 200],
  },
  nodes: {
    "key-partners": {
      title: "Key Partners",
      classes: "bg-cyan-600",
      grid: {
        column: {
          start: 0,
          end: 1,
        },
        row: {
          start: 0,
          end: 2,
        },
      },
      needsRelation: [["key-resources"]],
    },
    "key-activities": {
      title: "Key activities",
      classes: "bg-cyan-700",
      grid: {
        column: {
          start: 1,
          end: 2,
        },
        row: {
          start: 0,
          end: 1,
        },
      },
      needsRelation: [["key-resources"], ["key-partners"]],
    },
    "key-resources": {
      title: "Key Resources",
      classes: "bg-cyan-700",
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
      presetNodes: {
        Agreement: {
          ...defaultItemNode,
          data: {
            ...defaultItemData,
            name: "Agreement",
            icon: {
              src: "https://img.icons8.com/?size=100&format=png&id=16183",
            },
          },
        },
      },
    },
    value: {
      title: "Value Proposition",
      classes: "bg-yellow-600",
      grid: {
        column: {
          start: 2,
          end: 4,
        },
        row: {
          start: 0,
          end: 2,
        },
      },
    },
    "customer-relations": {
      title: "Customer Relations",
      classes: "bg-lime-700",
      grid: {
        column: {
          start: 4,
          end: 5,
        },
        row: {
          start: 0,
          end: 1,
        },
      },
      needsRelation: [["key-activities"]],
    },
    channels: {
      title: "Channels",
      classes: "bg-lime-700",
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
      needsRelation: [["key-activities"]],
    },
    customers: {
      title: "Customers",
      classes: "bg-lime-600",
      grid: {
        column: {
          start: 5,
          end: 6,
        },
        row: {
          start: 0,
          end: 2,
        },
      },
    },
    costs: {
      title: "Costs",
      classes: "bg-orange-500",
      grid: {
        column: {
          start: 0,
          end: 3,
        },
        row: {
          start: 2,
          end: 3,
        },
      },
    },
    revenue: {
      title: "Revenue Streams",
      classes: "bg-orange-500",
      grid: {
        column: {
          start: 3,
          end: 6,
        },
        row: {
          start: 2,
          end: 3,
        },
      },
    },
  },
} as const satisfies SegmentsTemplate<BMCSegments>;
