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
      type: "input",
      data: { label: "Input Node" },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      type: "item",
      data: {
        item: writable({
          name: "steam",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
        }),
      },
      position: { x: 60, y: 40 },
      parentNode: "key-activities" satisfies SegmentKey,
      extent: "parent",
    },
    {
      id: "3",
      type: "item",
      data: {
        label: "Node",
        item: writable({
          name: "empty test",
        }),
      },
      position: { x: 10, y: 100 },
      parentNode: "key-activities" satisfies SegmentKey,
      extent: "parent",
    },
  ],
  edges: [
    {
      id: "1-2-test",
      type: "default",
      source: "1",
      target: "2",
      label: "Edge Text",
      hidden: true,
    },
    {
      id: "1-3-test",
      type: "default",
      source: "1",
      target: "3",
      label: "Edge Text 2",
      hidden: true,
    },
  ],
} as const;
