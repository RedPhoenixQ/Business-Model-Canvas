import type { Page, Project } from ".";
import { getSegmentTemplateNodes, segmentTemplateInfo } from "../nodes/segment";
import type { ItemData } from "../nodes/item";

export const pageTemplates = {
  empty: {
    name: "Page 1",
    nodes: [],
    edges: [],
    grid: {
      columns: [],
      rows: [],
    },
  },
  default: {
    name: "Page 1",
    grid: segmentTemplateInfo.default.grid,
    nodes: getSegmentTemplateNodes<"default", ItemData, "item">("default", [
      {
        id: "1",
        type: "item",
        data: {
          name: "steam",
          icon: {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
            shape: "circle",
          },
        },
        position: { x: 90, y: 80 },
        parentNode: "key-partners",
        extent: "parent",
      },
      {
        id: "2",
        type: "item",
        data: {
          name: "empty test",
          icon: {},
        },
        position: { x: 30, y: 100 },
        parentNode: "key-activities",
        extent: "parent",
      },
      {
        id: "3",
        type: "item",
        data: {
          name: "empty test",
          icon: {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
          },
        },
        position: { x: 120, y: 50 },
        parentNode: "channels",
        extent: "parent",
      },
      {
        id: "4",
        type: "item",
        data: {
          name: "Costs",
          icon: {
            src: "https://static.vecteezy.com/system/resources/previews/019/006/277/original/money-cash-icon-png.png",
            shape: "circle",
            background: "light",
          },
        },
        position: { x: 320, y: 120 },
        parentNode: "costs",
        extent: "parent",
      },
    ]),
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
  },
  detailed: {
    name: "Page 1",
    grid: segmentTemplateInfo.detailed.grid,
    nodes: getSegmentTemplateNodes("detailed"),
    edges: [],
  },
} as const satisfies Record<string, Page & { name: "Page 1" }>;

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