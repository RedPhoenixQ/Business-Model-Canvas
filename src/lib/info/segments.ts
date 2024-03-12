import type { SegmentData } from "$lib/nodes/segment";
import type { PageData, SavedPage } from "$lib/project";
import type { Grid } from "$lib/project";
import type { Dimensions, Node, XYPosition } from "@xyflow/svelte";

export type GridPos = {
  column: { start: number; end: number };
  row: { start: number; end: number };
};

export type SegmentInfo = {
  title: string;
  classes: string;
  grid: GridPos;
};

export type SegmentsTemplate = {
  grid: Grid;
  nodes: Record<string, SegmentInfo>;
};

export type SegmentTemplateKey = keyof typeof segmentTemplateInfo;

export const segmentTemplateInfo = {
  empty: {
    grid: {
      columns: [],
      rows: [],
    },
    nodes: {} as Record<string, SegmentInfo>,
  },
  default: {
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
  },
  detailed: {
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
  },
} as const satisfies Record<string, SegmentsTemplate>;

const defaultSegment: Omit<
  Node<SegmentData, "segment">,
  "id" | "position" | "data"
> = {
  type: "segment",
  selectable: false,
  connectable: false,
  deletable: false,
  draggable: false,
  style: "pointer-events: none",
  zIndex: -10,
};

/**
 * @throws if an invalid tempalte and id combination is given
 */
export function getSegmentInfo(
  template: SegmentTemplateKey,
  id: string,
): SegmentInfo {
  const info = (segmentTemplateInfo as Record<string, SegmentsTemplate>)?.[
    template
  ]?.nodes?.[id];
  if (!info) {
    throw new Error(
      `No segment info is available for template ${template} with id ${id}`,
    );
  }
  return info;
}

export function getDimensionsInGrid(
  grid: Grid,
  { column, row }: GridPos,
): Dimensions & { position: XYPosition } {
  const data: Dimensions & { position: XYPosition } = {
    width: 0,
    height: 0,
    position: {
      x: 0,
      y: 0,
    },
  };
  for (let i = column.start; i < column.end; i++) {
    data.width += grid.columns[i];
  }
  for (let i = row.start; i < row.end; i++) {
    data.height += grid.rows[i];
  }
  for (let i = 0; i < column.start; i++) {
    data.position.x += grid.columns[i];
  }
  for (let i = 0; i < row.start; i++) {
    data.position.y += grid.rows[i];
  }
  return data;
}

export function fromSegmentTemplate<T extends SegmentTemplateKey>(
  template: T,
  page: Omit<Partial<SavedPage> & PageData, "template">,
): SavedPage & { template: T } {
  const { grid, nodes: segmentNodes } = segmentTemplateInfo[template];
  const nodes = Object.entries(segmentNodes).map(([id, info]) => {
    return {
      id,
      data: undefined,
      ...defaultSegment,
      ...getDimensionsInGrid(grid, info.grid),
    } satisfies Node<SegmentData, "segment">;
  }) as Node[];
  nodes.push(...(page.nodes ?? []));
  return {
    edges: [],
    template,
    grid,
    ...page,
    nodes,
  };
}
