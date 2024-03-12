import type { NodeTypes } from "@xyflow/svelte";
import Item from "./item/Item.svelte";
import Segment from "./segment/Segment.svelte";
import Slider from "./slider/Slider.svelte";
import Group from "./group/Group.svelte";
import { defaultItemNode } from "./item";
import { defaultSegmentNode } from "./segment";
import { defaultSliderNode } from "./slider";
import { defaultGroupNode } from "./group";
import type { DefaultNode } from "$lib/info/nodes";

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
} as const satisfies Record<
  keyof typeof nodeTypes,
  DefaultNode<unknown, string>
>;
