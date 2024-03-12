import type { NodeTypes } from "@xyflow/svelte";
import Item from "./item/Item.svelte";
import Segment from "./segment/Segment.svelte";
import Slider from "./slider/Slider.svelte";
import Group from "./group/Group.svelte";

export const nodeTypes = {
  item: Item,
  segment: Segment,
  slider: Slider,
  customGroup: Group,
} as const satisfies NodeTypes;
