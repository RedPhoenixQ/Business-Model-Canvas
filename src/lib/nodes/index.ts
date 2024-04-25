import type { Node, NodeTypes } from "@xyflow/svelte";
import Item from "./item/Item.svelte";
import Text from "./text/Text.svelte";
import Segment from "./segment/Segment.svelte";
import Slider from "./slider/Slider.svelte";
import Group from "./group/Group.svelte";
import { defaultItemNode, type ItemNode } from "./item";
import { defaultTextNode, type TextNode } from "./text";
import { defaultSegmentNode, type SegmentNode } from "./segment";
import { defaultSliderNode, type SliderNode } from "./slider";
import { defaultGroupNode, type GroupNode } from "./group";
import type { DefaultNode } from "$lib/info/nodes";
import { addHistoryEntry } from "$lib/project/history";

export type TypedNode =
  | ItemNode
  | SegmentNode
  | SliderNode
  | GroupNode
  | TextNode;

export const nodeTypes = {
  item: Item,
  text: Text,
  segment: Segment,
  slider: Slider,
  customGroup: Group,
} as const satisfies NodeTypes;

export const defaultNodes = {
  item: defaultItemNode,
  text: defaultTextNode,
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
