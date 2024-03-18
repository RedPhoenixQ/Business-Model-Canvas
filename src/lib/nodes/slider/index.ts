import type { DefaultNode } from "$lib/info/nodes";

export type SliderData = {
  value: [number];
};

export const defaultSliderNode = {
  type: "slider",
  data: {
    value: [50],
  },
  extent: "parent",
} as const satisfies DefaultNode;
