import { defaultGroupNode } from "$lib/nodes/group";
import { defaultItemData, defaultItemNode } from "$lib/nodes/item";
import type { SegmentsTemplate } from ".";
import * as detailedDesc from "$lib/info/descriptions/detailed";

export const detailedTemplate = {
  grid: {
    columns: [200, 200, 200, 200, 200, 200],
    rows: [200, 180, 180, 180, 200],
  },
  nodes: {
    "sustainable-company": {
      title: "Sustainable Company",
      classes: "bg-purple-500",
      grid: {
        column: {
          start: 0,
          end: 2,
        },
        row: {
          start: 0,
          end: 1,
        },
      },
    },
    value: {
      title: "Value Proposition",
      description: detailedDesc.Value,
      classes: "bg-yellow-600",
      grid: {
        column: {
          start: 2,
          end: 4,
        },
        row: {
          start: 0,
          end: 1,
        },
      },
    },
    impact: {
      title: "Impact - product level",
      classes: "bg-purple-500",
      grid: {
        column: {
          start: 4,
          end: 6,
        },
        row: {
          start: 0,
          end: 1,
        },
      },
    },
    "key-support": {
      title: "Key Support",
      classes: "bg-cyan-700",
      grid: {
        column: {
          start: 0,
          end: 1,
        },
        row: {
          start: 1,
          end: 4,
        },
      },
    },
    "key-resources": {
      title: "Key Resourses",
      classes: "bg-cyan-600",
      grid: {
        column: {
          start: 1,
          end: 2,
        },
        row: {
          start: 1,
          end: 4,
        },
      },
    },
    "key-activities": {
      title: "Key Activities",
      classes: "bg-cyan-600",
      grid: {
        column: {
          start: 2,
          end: 3,
        },
        row: {
          start: 1,
          end: 4,
        },
      },
    },
    marketing: {
      title: "Marketing",
      classes: "bg-lime-600",
      grid: {
        column: {
          start: 3,
          end: 5,
        },
        row: {
          start: 1,
          end: 2,
        },
      },
      presetGroups: {
        "Social Media": {
          group: {
            ...defaultGroupNode,
            data: {
              name: "Social Media",
            },
          },
          nodes: [
            {
              ...defaultItemNode,
              type: "item",
              data: {
                ...defaultItemData,
              },
              position: { x: 10, y: 30 },
            },
          ],
        },
      },
    },
    "customer-relations": {
      title: "Customer Relations",
      classes: "bg-lime-600",
      grid: {
        column: {
          start: 3,
          end: 5,
        },
        row: {
          start: 2,
          end: 3,
        },
      },
    },
    distribution: {
      title: "Distribution",
      classes: "bg-lime-600",
      grid: {
        column: {
          start: 3,
          end: 5,
        },
        row: {
          start: 3,
          end: 4,
        },
      },
      presetNodes: {
        "App Store": {
          ...defaultItemNode,
          type: "item",
          data: {
            ...defaultItemData,
            name: "App Store",
          },
        },
      },
    },
    users: {
      title: "Users",
      classes: "bg-lime-700",
      grid: {
        column: {
          start: 5,
          end: 6,
        },
        row: {
          start: 1,
          end: 4,
        },
      },
    },
    costs: {
      title: "Costs",
      classes: "bg-orange-600",
      grid: {
        column: {
          start: 0,
          end: 3,
        },
        row: {
          start: 4,
          end: 5,
        },
      },
    },
    sustainability: {
      title: "Sustainability",
      classes: "bg-purple-600",
      grid: {
        column: {
          start: 3,
          end: 5,
        },
        row: {
          start: 4,
          end: 5,
        },
      },
    },
    revenue: {
      title: "Revenue",
      classes: "bg-orange-700",
      grid: {
        column: {
          start: 5,
          end: 6,
        },
        row: {
          start: 4,
          end: 5,
        },
      },
    },
  },
} as const satisfies SegmentsTemplate;
