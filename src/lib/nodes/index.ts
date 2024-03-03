import type { NodeTypes } from "@xyflow/svelte";
import Item from "./item/Item.svelte";
import Segment from "./segment/Segment.svelte";

export const nodeTypes: NodeTypes = {
  item: Item,
  text: Item,
  segment: Segment,
};
