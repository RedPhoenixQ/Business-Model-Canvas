import { defaultSegmentNode, type SegmentData } from "$lib/nodes/segment";
import type { PageData, SavedPage } from "$lib/project";
import type { Grid } from "$lib/project";
import type { Dimensions, Node, XYPosition } from "@xyflow/svelte";
import { defaultTemplate } from "./default";
import { detailedTemplate } from "./detailed";
import type { ComponentType } from "svelte";

export type GridPos = {
  column: { start: number; end: number };
  row: { start: number; end: number };
};

export type SegmentInfo = {
  title: string;
  description?: ComponentType;
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
  default: defaultTemplate,
  detailed: detailedTemplate,
} as const satisfies Record<string, SegmentsTemplate>;

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
      ...defaultSegmentNode,
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
