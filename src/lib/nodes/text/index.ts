import type { DefaultNode } from "$lib/info/nodes";
import type { Node } from "@xyflow/svelte";

export type TextData = {
  name: string;
  text: string;
  ignoredRelations?: string[];
};

export type TextNode = Node<TextData, "text">;

export const defaultTextData = {
  name: "",
  text: "",
} as const satisfies TextData;

export const defaultTextNode = {
  type: "text",
  data: defaultTextData,
  width: 150,
  height: 100,
  extent: "parent",
} as const satisfies DefaultNode<TextNode>;
