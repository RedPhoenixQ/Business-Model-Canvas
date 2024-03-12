import type { Node } from "@xyflow/svelte";

export type DefaultNode<Data, T extends string> = Omit<
  Node<Data, T>,
  "id" | "position"
> & {
  type: T;
};
