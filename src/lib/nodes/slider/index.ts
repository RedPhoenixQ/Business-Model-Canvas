import type { IconInfo } from "$lib/components/custom/icon";
import type { DefaultNode } from "$lib/info/nodes";

export type SliderData = {
  value: [number];
  leftIcon: IconInfo;
  rightIcon: IconInfo;
};

export const defaultSliderNode = {
  type: "slider",
  data: {
    value: [50],
    leftIcon: {
      iconDefault: "Male"
    },
    rightIcon: {
      iconDefault: "Female"
    },
  },
  extent: "parent",
} as const satisfies DefaultNode;
