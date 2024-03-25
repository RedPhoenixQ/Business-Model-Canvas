import type { Node, NodeTypes } from "@xyflow/svelte";
import Item from "./item/Item.svelte";
import Segment from "./segment/Segment.svelte";
import Slider from "./slider/Slider.svelte";
import Group from "./group/Group.svelte";
import { defaultItemNode } from "./item";
import { defaultSegmentNode } from "./segment";
import { defaultSliderNode } from "./slider";
import { defaultGroupNode } from "./group";
import type { DefaultNode } from "$lib/info/nodes";
import { addHistoryEntry } from "$lib/project/history";

export const nodeTypes = {
  item: Item,
  segment: Segment,
  slider: Slider,
  customGroup: Group,
} as const satisfies NodeTypes;

export const defaultNodes = {
  item: defaultItemNode,
  segment: defaultSegmentNode,
  slider: defaultSliderNode,
  customGroup: defaultGroupNode,
} as const satisfies Record<keyof typeof nodeTypes, DefaultNode>;

export function useNodeDataChange<T extends object>(
  id: string,
  initialData: T,
) {
  let from = structuredClone(initialData);
  return async function nodeDataChange(data: T, ...keys: (keyof T)[]) {
    if (keys.length > 0 && !keys.some((key) => data[key] !== from[key])) return;
    const to = structuredClone(data);
    addHistoryEntry({ type: "nodeData", id, from, to });
    from = structuredClone(data);
  };
}

export function findChildNodes(parentNodes: Node[], nodes: Node[]): Node[] {
  const children = [];
  for (const node of parentNodes) {
    if (node.type !== "customGroup") continue;
    for (const storedNode of nodes) {
      if (storedNode.parentNode === node.id) {
        children.push(storedNode);
      }
    }
  }
  if (children.length !== 0) {
    children.push(...findChildNodes(children, nodes));
  }
  return children;
}
