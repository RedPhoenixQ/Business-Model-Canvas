import type { NodeTypes } from "@xyflow/svelte";
import Item from "./Item.svelte";
import Segment from "./Segment.svelte";

export const nodeTypes: NodeTypes = {
  item: Item,
  segment: Segment,
};
