import type { NodeTypes } from "@xyflow/svelte";
import Item from "./item/Item.svelte";
import Segment from "./segment/Segment.svelte";
import Slider from "./slider/Slider.svelte";

export const nodeTypes = {
  item: Item,
  segment: Segment,
  slider: Slider,
} as const satisfies NodeTypes;
