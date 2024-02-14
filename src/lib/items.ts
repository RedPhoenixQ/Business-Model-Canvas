import { writable, type Writable } from "svelte/store";
import { defaultSegments, type SegmentKey } from "./segments";
import type { Edge, Node } from "@xyflow/svelte";

export type Item = {
  name: string;
  icon?: string;
};

export const itemDetails: Writable<Writable<Item> | undefined> = writable();

export const defaultTemplate: { nodes: Node[]; edges: Edge[] } = {
  nodes: [
    ...defaultSegments,
    {
      id: "1",
      type: "item",
      data: {
        item: writable({
          name: "steam",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
        }),
      },
      position: { x: 90, y: 80 },
      parentNode: "key-partners" satisfies SegmentKey,
      extent: "parent",
    },
    {
      id: "2",
      type: "item",
      data: {
        item: writable({
          name: "empty test",
        }),
      },
      position: { x: 30, y: 100 },
      parentNode: "key-activities" satisfies SegmentKey,
      extent: "parent",
    },
    {
      id: "3",
      type: "item",
      data: {
        item: writable({
          name: "empty test",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
        }),
      },
      position: { x: 120, y: 50 },
      parentNode: "channels" satisfies SegmentKey,
      extent: "parent",
    },
    {
      id: "4",
      type: "item",
      data: {
        item: writable({
          name: "Costs",
          icon: "https://static.vecteezy.com/system/resources/previews/019/006/277/original/money-cash-icon-png.png",
        }),
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
} as const;
