import type { IconInfo } from "$lib/components/custom/icon";
import type { DefaultNode } from "$lib/info/nodes";
import type { Node } from "@xyflow/svelte";

export type SliderData = {
  value: [number];
  leftIcon: IconInfo;
  rightIcon: IconInfo;
};

export type SliderNode = Node<SliderData, "slider">;

export const defaultSliderData = {
  value: [50],
  leftIcon: {
    default: "Male",
  },
  rightIcon: {
    default: "Female",
  },
} as const satisfies SliderData;

export const defaultSliderNode = {
  type: "slider",
  data: defaultSliderData,
  extent: "parent",
} as const satisfies DefaultNode<SliderNode>;
