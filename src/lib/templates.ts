import type { Page, Project } from "./project";
import { defaultGridSize, defaultSegments, type SegmentKey } from "./segments";

export const pageTemplates = {
  empty: {
    nodes: [],
    edges: [],
    grid: {
      columns: [],
      rows: [],
    },
  },
  default: {
    nodes: [
      ...defaultSegments,
      {
        id: "1",
        type: "item",
        data: {
          item: {
            name: "steam",
            icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
          },
        },
        position: { x: 90, y: 80 },
        parentNode: "key-partners" satisfies SegmentKey,
        extent: "parent",
      },
      {
        id: "2",
        type: "item",
        data: {
          item: {
            name: "empty test",
          },
        },
        position: { x: 30, y: 100 },
        parentNode: "key-activities" satisfies SegmentKey,
        extent: "parent",
      },
      {
        id: "3",
        type: "item",
        data: {
          item: {
            name: "empty test",
            icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
          },
        },
        position: { x: 120, y: 50 },
        parentNode: "channels" satisfies SegmentKey,
        extent: "parent",
      },
      {
        id: "4",
        type: "item",
        data: {
          item: {
            name: "Costs",
            icon: "https://static.vecteezy.com/system/resources/previews/019/006/277/original/money-cash-icon-png.png",
          },
        },
        position: { x: 320, y: 120 },
        parentNode: "costs" satisfies SegmentKey,
        extent: "parent",
      },
    ],
    edges: [
      {
        id: "1-2-test",
        source: "1",
        target: "2",
      },
      {
        id: "2-3-test",
        source: "2",
        target: "3",
      },
      {
        id: "1-4-test",
        source: "1",
        target: "4",
      },
    ],
    grid: defaultGridSize,
  },
} as const satisfies Record<string, Page>;

export const projectTemplates = {
  empty: {
    activePageIndex: -1,
    pages: [],
  },
  default: {
    activePageIndex: 0,
    pages: [pageTemplates.default],
  },
} as const satisfies Record<string, Project>;
