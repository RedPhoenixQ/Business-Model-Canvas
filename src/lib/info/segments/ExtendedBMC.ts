import { defaultGroupNode } from "$lib/nodes/group";
import { defaultItemData, defaultItemNode } from "$lib/nodes/item";
import type { SegmentsTemplate } from ".";
import * as ExtededBMCDesc from "$lib/info/descriptions/ExtendedBMC";

type ExtendedBMCSegments =
  | "key-support"
  | "key-resources"
  | "key-activities"
  | "marketing"
  | "customer-relations"
  | "distribution"
  | "users"
  | "costs"
  | "value"
  | "revenue";

export const ExtendedBMCTemplate = {
  grid: {
    columns: [200, 200, 200, 200, 200, 200],
    rows: [200, 180, 180, 180, 200],
  },
  nodes: {
    "key-support": {
      title: "Key Support",
      description: ExtededBMCDesc.KeySupport,
      classes: "bg-cyan-700",
      grid: {
        column: {
          start: 0,
          end: 1,
        },
        row: {
          start: 0,
          end: 3,
        },
      },
      needsRelation: [["key-resources"], ["key-resources", "key-activities"]],
    },
    "key-resources": {
      title: "Key Resourses",
      description: ExtededBMCDesc.KeyResource,
      classes: "bg-cyan-600",
      grid: {
        column: {
          start: 1,
          end: 2,
        },
        row: {
          start: 0,
          end: 3,
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
    "key-activities": {
      title: "Key Activities",
      description: ExtededBMCDesc.KeyActivites,
      classes: "bg-cyan-600",
      grid: {
        column: {
          start: 2,
          end: 3,
        },
        row: {
          start: 0,
          end: 3,
        },
      },
      needsRelation: [["key-resources"], ["key-support"]],
    },
    marketing: {
      title: "Marketing",
      description: ExtededBMCDesc.Marketing,
      classes: "bg-lime-600",
      grid: {
        column: {
          start: 3,
          end: 5,
        },
        row: {
          start: 0,
          end: 1,
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
      needsRelation: [["key-activities"], ["key-support"]],
    },
    "customer-relations": {
      title: "Customer Relations",
      description: ExtededBMCDesc.CustomerRelation,
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
      needsRelation: [["key-activities"], ["key-support"]],
    },
    distribution: {
      title: "Distribution",
      description: ExtededBMCDesc.Distribution,
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
      needsRelation: [["key-activities"], ["key-support"]],
    },
    users: {
      title: "Users",
      description: ExtededBMCDesc.Users,
      classes: "bg-lime-700",
      grid: {
        column: {
          start: 5,
          end: 6,
        },
        row: {
          start: 0,
          end: 3,
        },
      },
    },
    costs: {
      title: "Costs",
      description: ExtededBMCDesc.Costs,
      classes: "bg-orange-600",
      grid: {
        column: {
          start: 0,
          end: 3,
        },
        row: {
          start: 3,
          end: 4,
        },
      },
    },
    value: {
      title: "Value Proposition",
      description: ExtededBMCDesc.Value,
      classes: "bg-yellow-600",
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
    },
    revenue: {
      title: "Revenue",
      description: ExtededBMCDesc.Revenue,
      classes: "bg-orange-700",
      grid: {
        column: {
          start: 5,
          end: 6,
        },
        row: {
          start: 3,
          end: 4,
        },
      },
    },
  },
} as const satisfies SegmentsTemplate<ExtendedBMCSegments>;
