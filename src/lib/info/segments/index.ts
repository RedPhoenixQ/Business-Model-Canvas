import { type Grid } from "$lib/project";
import type { Dimensions, Node, XYPosition } from "@xyflow/svelte";
import { defaultTemplate } from "./default";
import { detailedTemplate } from "./detailed";
import type { ComponentType } from "svelte";
import type { DefaultNode } from "../nodes";

export type GridPos = {
  column: { start: number; end: number };
  row: { start: number; end: number };
};

export type SegmentInfo = {
  title: string;
  description?: ComponentType;
  classes: string;
  grid: GridPos;
  presetNodes?: Record<string, DefaultNode>;
  presetGroups?: Record<
    string,
    {
      group: DefaultNode & { type: "customGroup" };
      nodes: (DefaultNode & Pick<Node, "position">)[];
    }
  >;
};

export type SegmentsTemplate = {
  grid: Grid;
  nodes: Record<string, SegmentInfo>;
};

export type SegmentTemplateKey = keyof typeof segmentTemplateInfo_;

const segmentTemplateInfo_ = {
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

export const segmentTemplateInfo: Record<SegmentTemplateKey, SegmentsTemplate> =
  segmentTemplateInfo_;

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
